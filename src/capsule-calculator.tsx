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
import { Switch } from "@/components/ui/switch";

const CAPSULE_SIZES = {
  "00": { value: "00", label: "00", capacity: 750 },
  "0": { value: "0", label: "0", capacity: 500 },
  "1": { value: "1", label: "1", capacity: 400 },
};

const PRESETS = {
  low: {
    cubensis: 100,
    niacin: 25,
  },
  mid: {
    cubensis: 150,
    niacin: 35,
  },
  high: {
    cubensis: 200,
    niacin: 50,
  },
};

const CapsuleCalculator = () => {
  const [capsuleSize, setCapsuleSize] = useState("00");
  const [quantity, setQuantity] = useState(100);
  const [doses, setDoses] = useState({
    cubensis: PRESETS.low.cubensis,
    niacin: PRESETS.low.niacin,
  });
  const [useNiacin, setUseNiacin] = useState(true);
  const [preset, setPreset] = useState("low");

  const calculateAmounts = () => {
    const capsuleCapacity =
      CAPSULE_SIZES[capsuleSize as keyof typeof CAPSULE_SIZES].capacity;
    const activeIngredients = doses.cubensis + (useNiacin ? doses.niacin : 0);
    const fillerAmount = capsuleCapacity - activeIngredients;

    return {
      perCapsule: {
        cubensis: doses.cubensis,
        niacin: useNiacin ? doses.niacin : 0,
        filler: fillerAmount,
        total: capsuleCapacity,
      },
      total: {
        cubensis: (doses.cubensis * quantity) / 1000, // in grams
        niacin: useNiacin ? (doses.niacin * quantity) / 1000 : 0, // in grams
        filler: (fillerAmount * quantity) / 1000, // in grams
      },
    };
  };

  const handlePresetChange = (newPreset: keyof typeof PRESETS) => {
    setPreset(newPreset);
    setDoses({
      cubensis: PRESETS[newPreset].cubensis,
      niacin: PRESETS[newPreset].niacin,
    });
  };

  const handleDoseChange = (type: keyof typeof doses, value: string) => {
    const newValue = parseInt(value) || 0;
    const newDoses = { ...doses, [type]: newValue };
    setDoses(newDoses);

    // Check if doses match any preset
    const matchingPreset = Object.entries(PRESETS).find(
      ([_, presetDoses]) =>
        presetDoses.cubensis === newDoses.cubensis &&
        presetDoses.niacin === newDoses.niacin
    );

    setPreset(matchingPreset ? matchingPreset[0] : "custom");
  };

  const amounts = calculateAmounts();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Capsule Calculator</h2>
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

        {/* Basic Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="capsule-size">Capsule Size</Label>
            <Select value={capsuleSize} onValueChange={setCapsuleSize}>
              <SelectTrigger id="capsule-size">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CAPSULE_SIZES).map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label} ({size.capacity}mg)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Number of Capsules</Label>
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

        {/* Ingredient Inputs */}
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

          <div className="flex items-center space-x-4">
            <Switch
              id="niacin-toggle"
              checked={useNiacin}
              onCheckedChange={setUseNiacin}
            />
            <Label htmlFor="niacin-toggle">Include Niacin</Label>
          </div>

          {useNiacin && (
            <div className="space-y-2">
              <Label htmlFor="niacin">Niacin (25-50mg)</Label>
              <Input
                id="niacin"
                type="number"
                min="25"
                max="50"
                value={doses.niacin}
                onChange={(e) => handleDoseChange("niacin", e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Results</h3>

          {/* Per Capsule */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Per Capsule:</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                Cubensis:{" "}
                <span className="font-medium">
                  {amounts.perCapsule.cubensis}mg
                </span>
              </p>
              {useNiacin && (
                <p>
                  Niacin:{" "}
                  <span className="font-medium">
                    {amounts.perCapsule.niacin}mg
                  </span>
                </p>
              )}
              <p>
                Curcuma (filler):{" "}
                <span className="font-medium">
                  {amounts.perCapsule.filler}mg
                </span>
              </p>
              <p>
                Total:{" "}
                <span className="font-medium">
                  {amounts.perCapsule.total}mg
                </span>
              </p>
            </div>
          </div>

          {/* Total Amounts */}
          <div>
            <h4 className="font-medium mb-2">Total Amounts Needed:</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                Cubensis:{" "}
                <span className="font-medium">
                  {amounts.total.cubensis.toFixed(1)}g
                </span>
              </p>
              {useNiacin && (
                <p>
                  Niacin:{" "}
                  <span className="font-medium">
                    {amounts.total.niacin.toFixed(1)}g
                  </span>
                </p>
              )}
              <p>
                Curcuma (filler):{" "}
                <span className="font-medium">
                  {amounts.total.filler.toFixed(1)}g
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapsuleCalculator;
