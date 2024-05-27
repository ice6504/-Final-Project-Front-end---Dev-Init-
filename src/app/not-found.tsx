import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" h-full grid place-items-center">
      <div className="text-center space-y-5">
        <h2 className="text-3xl sm:text-5xl font-bold text-primary">The page you are looking for can’t be found</h2>
        <Link className="btn btn-primary" href="/">
          Return Home<i className="fa-solid fa-house"></i>
        </Link>
      </div>
    </div>
  );
}
