import React from "react";
import img01 from "../../assets/image/sel-flearning-strategy-2.jpg";
import { Link } from "react-router-dom";
export default function CardLevel02() {
  return (
    <>
      <div class="bg-neutral-primary-soft block p-6 border border-gray-400 rounded-base shadow-xs text-white">
        <a href="#">
          <img class="rounded-base" src={img01} alt="" />
        </a>
        <a href="#">
          <h5 class="mt-4 mb-6 text-2xl font-semibold tracking-tight text-heading">
            Card Title
          </h5>
        </a>
        <Link
          to="#"
          class="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Read more
          <svg
            class="w-4 h-4 mt-1.5 ms-1 rtl:rotate-180 -me-0.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
