import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import * as Select from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ChangaCalculator = () => {
  // Default ratios
  const [herbRatio, setHerbRatio] = useState(3);
  const [dmtRatio, setDmtRatio] = useState(2);
  const [harmalaRatio, setHarmalaRatio] = useState(0.6);

  // Total quantity of herb
  const [totalHerb, setTotalHerb] = useState(0.5);

  // Selected base herb
  const [baseHerb, setBaseHerb] = useState("Blue Lotus");

  // Solution volume suggestion based on herb selection
  const baseHerbSolutionVolume = {
    "Blue Lotus": 1.5, // ml of solution per gram of herb
    "White Lotus": 1.6,
    Lavender: 1.2,
    "Pink Lotus": 1.4,
    Nettle: 1.3,
  };

  // Calculated quantities
  const dmtQuantity = (totalHerb * dmtRatio) / herbRatio;
  const harmalaQuantity = (totalHerb * harmalaRatio) / herbRatio;
  const suggestedSolutionVolume =
    totalHerb *
    baseHerbSolutionVolume[baseHerb as keyof typeof baseHerbSolutionVolume];

  // Set common ratios via shortcuts
  const setCommonRatio = (herb: number, dmt: number, harmala: number) => {
    setHerbRatio(herb);
    setDmtRatio(dmt);
    setHarmalaRatio(harmala);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Changa Ratio Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Base Herb Selection using Radix UI Select */}
        <div>
          <label className="block mb-2">Select Base Herb:</label>
          <Select.Select value={baseHerb} onValueChange={setBaseHerb}>
            <Select.SelectTrigger className="border p-2 rounded-md w-full">
              <Select.SelectValue placeholder="Select Herb" />
            </Select.SelectTrigger>

            <Select.SelectContent>
              <Select.SelectItem value="Blue Lotus">
                Blue Lotus
              </Select.SelectItem>
              <Select.SelectItem value="White Lotus">
                White Lotus
              </Select.SelectItem>
              <Select.SelectItem value="Lavender">Lavender</Select.SelectItem>
              <Select.SelectItem value="Pink Lotus">
                Pink Lotus
              </Select.SelectItem>
              <Select.SelectItem value="Nettle">Nettle</Select.SelectItem>
            </Select.SelectContent>
          </Select.Select>
        </div>

        {/* Herb Input */}
        <div>
          <label className="block mb-2">Base Herb (grams):</label>
          <Input
            type="number"
            value={totalHerb}
            onChange={(e) =>
              setTotalHerb(Math.max(0, parseFloat(e.target.value) || 0))
            }
            min="0"
            step="0.1"
          />
        </div>

        {/* Common Ratio Shortcuts */}
        <div className="space-y-2">
          <h4 className="font-bold">Common Ratios:</h4>
          <div className="">
            <button
              className="text-blue-500 underline"
              onClick={() => setCommonRatio(1, 1, 0.3)}
            >
              1:1:0.3 (Stronger DMT experience)
            </button>
            <br />
            <button
              className="text-blue-500 underline"
              onClick={() => setCommonRatio(3, 2, 0.6)}
            >
              3:2:0.6 (Balanced)
            </button>{" "}
            default
            <br />
            <button
              className="text-blue-500 underline"
              onClick={() => setCommonRatio(4, 2, 1)}
            >
              4:2:1 (Gentle, meditative)
            </button>
          </div>
        </div>

        {/* Ratio Sliders */}
        <div>
          <label className="block mb-2">Herb Ratio:</label>
          <Slider
            min={0}
            max={10}
            step={0.1}
            value={[herbRatio]}
            onValueChange={(value) => setHerbRatio(value[0])}
          />
          <span className="block mt-2 text-center">{herbRatio.toFixed(1)}</span>
        </div>

        <div>
          <label className="block mb-2">DMT Ratio:</label>
          <Slider
            min={0}
            max={10}
            step={0.1}
            value={[dmtRatio]}
            onValueChange={(value) => setDmtRatio(value[0])}
          />
          <span className="block mt-2 text-center">{dmtRatio.toFixed(1)}</span>
        </div>

        <div>
          <label className="block mb-2">Harmala Ratio:</label>
          <Slider
            min={0}
            max={5}
            step={0.1}
            value={[harmalaRatio]}
            onValueChange={(value) => setHarmalaRatio(value[0])}
          />
          <span className="block mt-2 text-center">
            {harmalaRatio.toFixed(1)}
          </span>
        </div>

        {/* Results */}
        <div className="bg-gray-100 p-4 rounded-md">
          <p>
            <strong>Total Herb:</strong> {totalHerb.toFixed(2)} grams
          </p>
          <p>
            <strong>DMT:</strong> {dmtQuantity.toFixed(2)} grams
          </p>
          <p>
            <strong>Harmalas:</strong> {harmalaQuantity.toFixed(2)} grams
          </p>
          <p>
            <strong>Suggested Solution Volume:</strong>{" "}
            {suggestedSolutionVolume.toFixed(2)} ml
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChangaCalculator;
