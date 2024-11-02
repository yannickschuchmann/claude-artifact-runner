import { useState, useCallback } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Artifact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Your Artifact</h1>
      <Button onClick={toggle} className="mt-4">
        OK
      </Button>
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
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your Artifact</AlertDialogTitle>
            <AlertDialogDescription>It works!</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={toggle}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Artifact;
