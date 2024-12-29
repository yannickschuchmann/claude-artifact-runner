import { Link } from "wouter";

const Start = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Link href="/coco-coir-calculator">
        <a className="mt-4 text-blue-500 hover:underline">
          Go to Coco Coir Calculator
        </a>
      </Link>
      <Link href="/changa-calculator">
        <a className="mt-4 text-blue-500 hover:underline">
          Go to Changa Calculator
        </a>
      </Link>
      <Link href="/feco-bottling-calculator">
        <a className="mt-4 text-blue-500 hover:underline">
          Go to FECO Bottling Calculator
        </a>
      </Link>
      <Link href="/stamets-stack-calculator">
        <a className="mt-4 text-blue-500 hover:underline">
          Go to Stamets Stack Calculator
        </a>
      </Link>
    </div>
  );
};

export default Start;
