"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({
  ButtonTitle ,
  onPending ,
}: {
  ButtonTitle: string;
  onPending: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500
      px-4 py-1.5 rounded-xl transition duration-200 active:scale-95
      disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? `${onPending}...` : ButtonTitle}
    </button>
  );
}

export default SubmitButton;
