import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FECOBottlingCalculator = () => {
  const [cannabisAmount, setCannabisAmount] = useState(40);
  const [pureBottles, setPureBottles] = useState(60);
  const [lavandaBottles, setLavandaBottles] = useState(20);

  // Fixed values
  const THC_PERCENTAGE = 10; // 10% THC strain
  const TARGET_THC_PER_BOTTLE = 0.5; // 0.5g per 5ml bottle (≤0.9% THC)

  // Calculated values
  const [totalBottles, setTotalBottles] = useState(0);
  const [totalMctNeeded, setTotalMctNeeded] = useState(0);
  const [pureMctBase, setPureMctBase] = useState(0);
  const [pureMctExtra, setPureMctExtra] = useState(0);
  const [lavandaMctBase, setLavandaMctBase] = useState(0);
  const [lavandaMctExtra, setLavandaMctExtra] = useState(0);

  useEffect(() => {
    // Calculate total possible bottles based on cannabis amount and target THC
    const calculatedTotalBottles = Math.floor(
      cannabisAmount / TARGET_THC_PER_BOTTLE
    );
    setTotalBottles(calculatedTotalBottles);

    // Calculate total MCT needed (3/4 of total volume)
    const totalVolume = calculatedTotalBottles * 5; // 5ml per bottle
    const baseMctNeeded = totalVolume * 0.75;
    setTotalMctNeeded(baseMctNeeded);

    // Calculate Pure Edition quantities
    const pureVolume = pureBottles * 5;
    const pureMctBaseAmount = pureVolume * 0.75;
    const pureMctExtraAmount = pureVolume * 0.25;
    setPureMctBase(pureMctBaseAmount);
    setPureMctExtra(pureMctExtraAmount);

    // Calculate Lavanda Edition quantities
    const lavandaVolume = lavandaBottles * 5;
    const lavandaMctBaseAmount = lavandaVolume * 0.75;
    const lavandaMctExtraAmount = lavandaVolume * 0.25;
    setLavandaMctBase(lavandaMctBaseAmount);
    setLavandaMctExtra(lavandaMctExtraAmount);
  }, [cannabisAmount, pureBottles, lavandaBottles]);

  const bottleDistributionValid = pureBottles + lavandaBottles <= totalBottles;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>FECO Bottling Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <p>
            <strong>Strain THC Content:</strong> {THC_PERCENTAGE}%
          </p>
          <p>
            <strong>Target THC per 5ml Bottle:</strong> {TARGET_THC_PER_BOTTLE}g
            (≤0.9% THC)
          </p>
        </div>

        <div>
          <label className="block mb-2">Cannabis Amount (g):</label>
          <Input
            type="number"
            value={cannabisAmount}
            onChange={(e) =>
              setCannabisAmount(Math.max(0, parseFloat(e.target.value) || 0))
            }
            min="0"
            step="0.1"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <p>
            <strong>Total Possible 5ml Bottles:</strong> {totalBottles}
          </p>
          <p>
            <strong>Total Base MCT Oil Needed:</strong>{" "}
            {totalMctNeeded.toFixed(1)}ml
          </p>
        </div>

        <div>
          <label className="block mb-2">Pure Edition Bottles:</label>
          <Input
            type="number"
            value={pureBottles}
            onChange={(e) =>
              setPureBottles(Math.max(0, parseInt(e.target.value) || 0))
            }
            min="0"
          />
        </div>

        <div>
          <label className="block mb-2">Lavanda Edition Bottles:</label>
          <Input
            type="number"
            value={lavandaBottles}
            onChange={(e) =>
              setLavandaBottles(Math.max(0, parseInt(e.target.value) || 0))
            }
            min="0"
          />
        </div>

        {!bottleDistributionValid && (
          <Alert variant="destructive">
            <AlertDescription>
              Warning: Total of Pure and Lavanda bottles exceeds possible
              bottles from cannabis amount
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-gray-100 p-4 rounded-md space-y-4">
          <div>
            <h3 className="font-bold">Pure Edition:</h3>
            <p>
              <strong>Base MCT Oil:</strong> {pureMctBase.toFixed(1)}ml
            </p>
            <p>
              <strong>Extra Pure MCT Oil:</strong> {pureMctExtra.toFixed(1)}ml
            </p>
          </div>

          <div>
            <h3 className="font-bold">Lavanda Edition:</h3>
            <p>
              <strong>Base MCT Oil:</strong> {lavandaMctBase.toFixed(1)}ml
            </p>
            <p>
              <strong>Lavender MCT Oil:</strong> {lavandaMctExtra.toFixed(1)}ml
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FECOBottlingCalculator;
