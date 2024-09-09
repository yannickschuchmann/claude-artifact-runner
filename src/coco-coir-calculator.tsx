import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RatioCalculator = () => {
  const [jars, setJars] = useState(5);
  const [jarSize, setJarSize] = useState(900);
  const [ratio, setRatio] = useState(3.2);
  const [casing, setCasing] = useState(false);
  const [cocoCoir, setCocoCoir] = useState(0);
  const [water, setWater] = useState(0);

  useEffect(() => {
    document.title = "Coco Coir Calculator";

    let baseCocoCoir = (jars / 5) * 650 * (ratio / 3.2) * (jarSize / 900);
    if (casing) {
      baseCocoCoir *= 1.25;
    }
    setCocoCoir(Math.round(baseCocoCoir));

    const waterNeeded = (baseCocoCoir / 650) * 3000;
    setWater(Math.round(waterNeeded));
  }, [jars, jarSize, ratio, casing]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Grain Jar to Coco Coir Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block mb-2">Jar Size (ml):</label>
          <Input
            type="number"
            value={jarSize}
            onChange={(e) =>
              setJarSize(Math.max(1, parseInt(e.target.value) || 0))
            }
            min="1"
          />
        </div>

        <div>
          <label className="block mb-2">Number of Grain Jars:</label>
          <Slider
            min={1}
            max={20}
            step={1}
            value={[jars]}
            onValueChange={(value) => setJars(value[0])}
          />
          <span className="block mt-2 text-center">
            {jars} jar{jars !== 1 ? "s" : ""}
          </span>
        </div>

        <div>
          <label className="block mb-2">Ratio (1:X):</label>
          <Slider
            min={1}
            max={6}
            step={0.1}
            value={[ratio]}
            onValueChange={(value) => setRatio(value[0])}
          />
          <span className="block mt-2 text-center">1:{ratio.toFixed(1)}</span>
        </div>

        <div className="flex items-center justify-between">
          <label>Include Casing Layer:</label>
          <Switch checked={casing} onCheckedChange={setCasing} />
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <p>
            <strong>Dry Coco Coir Needed:</strong> {cocoCoir}g
          </p>
          <p>
            <strong>Boiling Water Needed:</strong> {water}ml
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RatioCalculator;
