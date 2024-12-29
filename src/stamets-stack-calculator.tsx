import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PRESETS = {
  low: {
    cubensis: 100,
    lionsMane: 500,
    niacin: 50,
  },
  mid: {
    cubensis: 150,
    lionsMane: 750,
    niacin: 75,
  },
  high: {
    cubensis: 200,
    lionsMane: 1000,
    niacin: 100,
  },
};

const CAPSULE_SIZES = [
  { value: "00", label: "00 (750mg)" },
  { value: "0", label: "0 (500mg)" },
  { value: "1", label: "1 (400mg)" },
];

const StametsCalculator = () => {
  const [capsuleSize, setCapsuleSize] = useState("00");
  const [quantity, setQuantity] = useState(100);
  const [doses, setDoses] = useState(PRESETS.low);
  const [preset, setPreset] = useState("low");

  const calculateTotal = () => {
    const totalPerCapsule = doses.cubensis + doses.lionsMane + doses.niacin;
    return {
      perCapsule: totalPerCapsule,
      cubensisTotal: (doses.cubensis * quantity) / 1000,
      lionsManeTotal: (doses.lionsMane * quantity) / 1000,
      niacinTotal: (doses.niacin * quantity) / 1000,
    };
  };

  const handlePresetChange = (newPreset: keyof typeof PRESETS) => {
    setPreset(newPreset);
    setDoses(PRESETS[newPreset]);
  };

  const handleDoseChange = (type: keyof typeof doses, value: string) => {
    const newValue = parseInt(value) || 0;
    const newDoses = { ...doses, [type]: newValue };
    setDoses(newDoses);

    // Check if doses match any preset
    const matchingPreset = Object.entries(PRESETS).find(
      ([_, presetDoses]) =>
        presetDoses.cubensis === newDoses.cubensis &&
        presetDoses.lionsMane === newDoses.lionsMane &&
        presetDoses.niacin === newDoses.niacin
    );

    setPreset(matchingPreset ? matchingPreset[0] : "custom");
  };

  const totals = calculateTotal();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">
          Stamets Stack Calculator
        </h2>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Presets */}
        <div className="flex gap-4 justify-center">
          {Object.keys(PRESETS).map((presetName) => (
            <Button
              key={presetName}
              onClick={() =>
                handlePresetChange(presetName as keyof typeof PRESETS)
              }
              variant={preset === presetName ? "default" : "outline"}
            >
              {presetName.charAt(0).toUpperCase() + presetName.slice(1)}
            </Button>
          ))}
          {preset === "custom" && (
            <span className="px-4 py-2 bg-gray-100 rounded">Custom</span>
          )}
        </div>

        {/* Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="capsule-size">Capsule Size</Label>
            <Select value={capsuleSize} onValueChange={setCapsuleSize}>
              <SelectTrigger id="capsule-size">
                <SelectValue placeholder="Select capsule size" />
              </SelectTrigger>
              <SelectContent>
                {CAPSULE_SIZES.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="100"
              step="100"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 100)}
            />
          </div>
        </div>

        {/* Dose Inputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cubensis">Cubensis (100-200mg)</Label>
            <Input
              id="cubensis"
              type="number"
              min="100"
              max="200"
              value={doses.cubensis}
              onChange={(e) => handleDoseChange("cubensis", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lionsMane">Lion's Mane (500-1000mg)</Label>
            <Input
              id="lionsMane"
              type="number"
              min="500"
              max="1000"
              value={doses.lionsMane}
              onChange={(e) => handleDoseChange("lionsMane", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="niacin">Niacin (50-100mg)</Label>
            <Input
              id="niacin"
              type="number"
              min="50"
              max="100"
              value={doses.niacin}
              onChange={(e) => handleDoseChange("niacin", e.target.value)}
            />
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Results</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Total per capsule:{" "}
              <span className="font-medium">{totals.perCapsule}mg</span>
            </p>
            <p className="text-sm text-gray-600">
              Total Cubensis:{" "}
              <span className="font-medium">{totals.cubensisTotal}g</span>
            </p>
            <p className="text-sm text-gray-600">
              Total Lion's Mane:{" "}
              <span className="font-medium">{totals.lionsManeTotal}g</span>
            </p>
            <p className="text-sm text-gray-600">
              Total Niacin:{" "}
              <span className="font-medium">{totals.niacinTotal}g</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StametsCalculator;
