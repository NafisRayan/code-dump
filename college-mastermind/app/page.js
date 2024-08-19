// Import necessary components and libraries
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>College Mastermind</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-white text-gray-800">
        {/* Navbar */}
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-blue-600">College Mastermind</div>
              <div className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
                <Link href="/services" className="text-gray-600 hover:text-blue-600">Services</Link>
                <Link href="/countries" className="text-gray-600 hover:text-blue-600">Countries</Link>
                <Link href="/partnership" className="text-gray-600 hover:text-blue-600">Partnership</Link>
                <Link href="/events" className="text-gray-600 hover:text-blue-600">Events</Link>
                <Link href="/contact-us" className="text-gray-600 hover:text-blue-600">Contact Us</Link>
                <Link href="/register" className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white">Login</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold text-blue-600">Strengthen Your Application with High Test Scores</h1>
            <p className="mt-4 text-gray-700">Increase your scores with a test prep program that gets the results that you want!</p>
            <button className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700">Book Your Strategy Session</button>
            <div className="mt-8">
              <img src="https://source.unsplash.com/random/800x400?education" alt="Students" className="mx-auto rounded-lg shadow-md" />
            </div>
          </div>
        </section>

        {/* Success Story Section */}
        <section className="bg-blue-100 py-12">
          <div className="container mx-auto px-6">
            <div className="bg-blue-500 text-white rounded-lg p-8 flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0">
                <img src="https://source.unsplash.com/random/150x150?person" alt="Success Story" className="rounded-full shadow-md" />
              </div>
              <div className="md:ml-6">
                <h2 className="text-2xl font-bold">Learn The Strategy Behind Our Success!</h2>
                <p className="mt-4">College Mastermind had 10 students within the past year score a perfect 36 on the ACT!</p>
                <p className="mt-2">Want to know how we get such great results? Watch our video!</p>
                <button className="mt-4 bg-white text-blue-500 px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white">Get Registered Now</button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-blue-500 text-white p-8 rounded-lg">
                <h3 className="text-3xl font-bold">100</h3>
                <p className="mt-2">of high achievers preparing for top 50 universities 2024</p>
              </div>
              <div className="bg-blue-500 text-white p-8 rounded-lg">
                <h3 className="text-3xl font-bold">94%</h3>
                <p className="mt-2">of our clients get into their top 3 choices in 2023</p>
              </div>
              <div className="bg-blue-500 text-white p-8 rounded-lg">
                <h3 className="text-3xl font-bold">2</h3>
                <p className="mt-2">Perfect ACT scores in 2022 School Year</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-blue-100 py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-700">Don't Settle for Less than Your FULLEST Potential!</h2>
            <p className="mt-4 text-gray-700">Our test prep curriculum produces results.</p>
          </div>
        </section>

        {/* Plan, Motivation, and Scores Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-600">Get the plan, accountability, and the motivation you need to achieve the scores you want!</h2>
              <p className="mt-4 text-gray-700">Our test prep programs were designed to get amazing results!</p>
              <button className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700">Learn More</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-100 rounded-lg p-8">
                <h3 className="text-xl font-bold text-blue-600">Do we need test prep, or can I go test-optional?</h3>
                <p className="mt-4 text-gray-700">A score is a key way that universities can judge a student.</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Learn More</button>
              </div>
              <div className="bg-blue-100 rounded-lg p-8">
                <h3 className="text-xl font-bold text-blue-600">What Scores Should I Try to Reach?</h3>
                <p className="mt-4 text-gray-700">Top 30 University: SAT Scores 1500+ / ACT Scores 35+</p>
                <p className="mt-2 text-gray-700">Top 100 University: SAT Scores 1450+ / ACT Scores 33+</p>
                <p className="mt-2 text-gray-700">Top 200 University: SAT Scores 1440+ / ACT Scores 31+</p>
                <p className="mt-2 text-gray-700">Less Selective: SAT Scores 1280+ / ACT Scores 27+</p>
              </div>
            </div>
          </div>
        </section>

        {/* Test Prep Programs Section */}
        <section className="bg-blue-50 py-12">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-600">Our Test Prep Programs</h2>
            </div>
            <div className="flex justify-center mb-8">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md mx-2">View All</button>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-md mx-2">Test Prep</button>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-md mx-2">High Scores</button>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-md mx-2">PSAT</button>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-md mx-2">Test Anxiety</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <img src="https://source.unsplash.com/random/200x200?book" alt="Test Prep" className="mb-4 rounded-md" />
                <h3 className="text-xl font-bold text-blue-600">SAT and ACT Prep</h3>
                <p className="mt-2 text-gray-700">For students with existing scores under 1250 SAT and 21 ACT</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Read More</button>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <img src="https://source.unsplash.com/random/200x200?study" alt="High Scores" className="mb-4 rounded-md" />
                <h3 className="text-xl font-bold text-blue-600">SAT and ACT High Scorers</h3>
                <p className="mt-2 text-gray-700">For students with existing scores of 1250+ SAT and 21+ ACT</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Read More</button>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <img src="https://source.unsplash.com/random/200x200?exam" alt="PSAT" className="mb-4 rounded-md" />
                <h3 className="text-xl font-bold text-blue-600">PSAT Training</h3>
                <p className="mt-2 text-gray-700">For students preparing to qualify for National Merit Scholarships</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Read More</button>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <img src="https://source.unsplash.com/random/200x200?anxiety" alt="Test Anxiety" className="mb-4 rounded-md" />
                <h3 className="text-xl font-bold text-blue-600">Test Anxiety</h3>
                <p className="mt-2 text-gray-700">For students who are underperforming on tests because of nerves</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Read More</button>
              </div>
            </div>
          </div>
        </section>

        {/* GPA to Test Scores Section */}
        <section className="bg-blue-100 py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-700">GPA to Test Scores Calculate</h2>
            <button className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700">What Score Should I Get?</button>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-600">Case Studies</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-100 rounded-lg p-8">
                <h3 className="text-xl font-bold text-blue-600">Accommodations</h3>
                <p className="mt-4 text-gray-700">Ask about how we were able to raise ACT scores by 7 points!</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Read More</button>
              </div>
              <div className="bg-blue-100 rounded-lg p-8">
                <h3 className="text-xl font-bold text-blue-600">Motivation</h3>
                <p className="mt-4 text-gray-700">Find out how we were able to raise SAT scores by 200 points!</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Read More</button>
              </div>
              <div className="bg-blue-100 rounded-lg p-8">
                <h3 className="text-xl font-bold text-blue-600">One Subject</h3>
                <p className="mt-4 text-gray-700">Find out how we were able to raise ACT scores by 5 points!</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Read More</button>
              </div>
              <div className="bg-blue-100 rounded-lg p-8">
                <h3 className="text-xl font-bold text-blue-600">Careless Errors</h3>
                <p className="mt-4 text-gray-700">Overcoming careless mistakes and how scores increased from 1100 to 1400 on the SAT</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Read More</button>
              </div>
            </div>
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700">Book Your Strategy Session</button>
            </div>
          </div>
        </section>

{/* Footer */}
<footer className="bg-blue-500 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-xl font-bold">Quick Links</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/" className="hover:underline">Home</Link></li>
                  <li><Link href="/about" className="hover:underline">About</Link></li>
                  <li><Link href="/services" className="hover:underline">Services</Link></li>
                  <li><Link href="/contact-us" className="hover:underline">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold">Services</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/tutoring" className="hover:underline">Tutoring</Link></li>
                  <li><Link href="/admissions" className="hover:underline">Admissions</Link></li>
                  <li><Link href="/test-prep" className="hover:underline">Test Prep</Link></li>
                  <li><Link href="/counseling" className="hover:underline">Counseling</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold">Countries</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/usa" className="hover:underline">USA</Link></li>
                  <li><Link href="/canada" className="hover:underline">Canada</Link></li>
                  <li><Link href="/uk" className="hover:underline">UK</Link></li>
                  <li><Link href="/australia" className="hover:underline">Australia</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold">Subscribe to Our Newsletter</h3>
                <form className="mt-4">
                  <input type="email" className="w-full p-2 rounded-md" placeholder="Email" />
                  <button type="submit" className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-200">Subscribe</button>
                </form>
                <div className="mt-4 space-x-2">
                  <Link href="#" className="hover:text-gray-300">Facebook</Link>
                  <Link href="#" className="hover:text-gray-300">Twitter</Link>
                  <Link href="#" className="hover:text-gray-300">LinkedIn</Link>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <p className="text-gray-200">Privacy Policy | Legal Terms</p>
            </div>
          </div>
        </footer>

      </body>
    </>
  );
}
