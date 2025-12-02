import React from 'react';

export default function AboutUs() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-white to-slate-50 py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 md:p-12">
          <header className="mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
              CODE_ACADMEY
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-2">Culture and science city</p>
          </header>

          <div className="space-y-6 text-slate-700 text-justify leading-relaxed">
            <p>
              In this project, we strive to support fellow learners on their educational journey by providing some of the most well-tested and widely studied methods of acquiring knowledge in the field of technology—an area that has been an integral part of our lives.
            </p>

            <p>
              A common gap in many learning resources related to computer science and technology is the lack of engagement and exposure. Many individuals have either never interacted with a computer or have done so without truly understanding its functions—let alone programming one. To address this, we offer a platform designed to bridge that gap.
            </p>

            <p>
              By incorporating tools that learners encounter in their daily lives—such as games, videos, and community posts—we create an environment that fosters both exposure and engagement. This approach not only motivates learners but also equips them with the confidence to tackle more complex and challenging topics.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-slate-800">Join CODE_ACADMEY</p>
                <p className="text-sm text-slate-500">Learn by doing — step by step.</p>
              </div>

              <div className="mt-4 md:mt-0">
                <span className="text-sm text-slate-600">Signature:</span>
                <p className="text-sm font-medium text-slate-700">Culture and science city</p>
              </div>
            </div>
          </div>

          <footer className="mt-8 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block mt-4 px-6 py-2 rounded-full bg-slate-800 text-white text-sm font-medium hover:opacity-95"
            >
              Back to top
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
}
