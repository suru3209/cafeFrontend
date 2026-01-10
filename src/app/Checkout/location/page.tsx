"use client";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LocateFixed } from "lucide-react";

type Suggestion = {
  id: string;
  place_name: string;
  center: [number, number];
  context?: { id: string; text: string }[];
};

export default function LocationPage() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Suggestion | null>(null);

  const [viewState, setViewState] = useState({
    latitude: 28.6139,
    longitude: 77.209,
    zoom: 14,
  });

  /* ================= ADDRESS PARSER ================= */

  const parseAddress = (full: string) => {
    const parts = full.split(",").map((p) => p.trim());

    return {
      address: parts[0] || full,
      city: parts[1] || "Unknown",
      state: parts[2] || "Unknown",
      country: parts[3] || "India",
    };
  };

  /* ================= PIN CODE ================= */

  const getPinCode = async (lat: number, lng: number) => {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
    );

    const data = await res.json();

    let zipCode = "000000";

    for (const f of data.features || []) {
      for (const c of f.context || []) {
        if (c.id.includes("postcode")) {
          zipCode = c.text;
        }
      }
    }

    return zipCode;
  };

  /* ================= LIVE SUGGESTIONS ================= */

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?autocomplete=true&limit=5&access_token=${
            process.env.NEXT_PUBLIC_MAPBOX_TOKEN
          }`,
          { signal: controller.signal }
        );

        const data = await res.json();
        setSuggestions(data.features || []);
      } catch {}
    };

    fetchSuggestions();
    return () => controller.abort();
  }, [query]);

  /* ================= CURRENT LOCATION ================= */

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setViewState({
          latitude: lat,
          longitude: lng,
          zoom: 16,
        });

        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
        );

        const data = await res.json();

        if (data.features?.length) {
          setQuery(data.features[0].place_name);
        }
      },
      () => alert("Location access denied")
    );
  };

  /* ================= SAVE LOCATION ================= */

  const saveLocation = async () => {
    if (!query.trim()) {
      alert("Please search & select location");
      return;
    }

    setLoading(true);

    try {
      const { address, city, state, country } = parseAddress(query);

      const zipCode = await getPinCode(
        viewState.latitude,
        viewState.longitude
      );

      await api.post("/api/addresses", {
        label: "Home",
        address: `${address}, ${city}, ${state}, ${country}`,
        city,
        state,
        zipCode,
        latitude: viewState.latitude,
        longitude: viewState.longitude,
        isDefault: true,
      });

      router.push("/Checkout/summary");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      {/* SKIP BUTTON */}
      <div className="px-4 pt-3 text-center">
        <button
          onClick={() => router.push("/Checkout/summary")}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Skip the location
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="px-4 py-3 border-b bg-white">
        <div className="relative">
          <Input
            placeholder="Search delivery location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-md z-50">
              {suggestions.map((s) => (
                <div
                  key={s.id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                  onClick={() => {
                    setSelectedPlace(s);
                    setQuery(s.place_name);
                    setSuggestions([]);
                    setViewState({
                      latitude: s.center[1],
                      longitude: s.center[0],
                      zoom: 16,
                    });
                  }}
                >
                  {s.place_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MAP */}
      <div className="flex-1 relative">
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          {...viewState}
          onMove={(e) => setViewState(e.viewState)}
        >
          <Marker
            latitude={viewState.latitude}
            longitude={viewState.longitude}
            anchor="bottom"
          />
        </Map>

        {/* CURRENT LOCATION BUTTON */}
        <button
          onClick={useCurrentLocation}
          className="absolute bottom-6 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
        >
          <LocateFixed size={22} />
        </button>
      </div>

      {/* CONFIRM */}
      <div className="p-4 border-t bg-white">
        <Button
          className="w-full text-lg"
          onClick={saveLocation}
          disabled={loading}
        >
          {loading ? "Saving..." : "Confirm Location"}
        </Button>
      </div>
    </div>
  );
}
