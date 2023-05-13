import Image from "next/image";
import React from "react";

const Team = () => {
  return (
    <section className="text-gray-200 body-font py-16">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-2xl font-bold title-font mb-4 text-gray-200">
            OUR TEAM
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/4 md:w-1/2">
            <div className="h-full flex flex-col items-center text-center">
              <Image
                width={200}
                height={200}
                alt="team"
                className="flex-shrink-0 rounded-lg w-full h-56 object-contain sm:object-cover mb-4"
                src="https://avatars.githubusercontent.com/u/63443330?v=4"
              />
              <div className="w-full">
                <h2 className="title-font font-medium text-lg text-green-300">
                  Rishi Sharma
                </h2>
                <h3 className="text-gray-200 mb-3">(RA1911003030293)</h3>
                <h3 className="text-gray-200 mb-3">Module Lead & Backend</h3>
                <p className="mb-4">
                  He managed the project as a module lead, and he also worked with Python Model and Blockchain.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/4 md:w-1/2">
            <div className="h-full flex flex-col items-center text-center">
              <Image
                width={200}
                height={200}
                alt="team"
                className="flex-shrink-0 rounded-lg w-full h-56 object-contain sm:object-cover mb-4"
                src="https://avatars.githubusercontent.com/u/74879193?v=4"
              />
              <div className="w-full">
                <h2 className="title-font font-medium text-lg text-green-300">
                  Tushar Mukherjee
                </h2>
                <h3 className="text-gray-200 mb-3">(RA1911003030257)</h3>
                <h3 className="text-gray-200 mb-3">Frontend and APIs</h3>
                <p className="mb-4">
                Frontend architecture and API logic were created to communicate between the blockchain and the ML model to the user.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/4 md:w-1/2">
            <div className="h-full flex flex-col items-center text-center">
              <Image
                width={200}
                height={200}
                alt="team"
                className="flex-shrink-0 rounded-lg w-full h-56 object-contain sm:object-cover mb-4"
                src="https://avatars.githubusercontent.com/u/58652650?v=4"
              />
              <div className="w-full">
                <h2 className="title-font font-medium text-lg text-green-300">
                  Vaibhav Agarwal
                </h2>
                <h3 className="text-gray-200 mb-3">(RA1911003030261)</h3>
                <h3 className="text-gray-200 mb-3">Backend and ML</h3>
                <p className="mb-4">
                  Worked on Python Model and building its API to provide future price prediction of etherium.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/4 md:w-1/2">
            <div className="h-full flex flex-col items-center text-center">
              <Image
                width={200}
                height={200}
                alt="team"
                className="flex-shrink-0 rounded-lg w-full h-56 object-contain sm:object-cover mb-4"
                src="https://avatars.githubusercontent.com/u/73923750?v=4"
              />
              <div className="w-full">
                <h2 className="title-font font-medium text-lg text-green-300">
                  Vaibhav Dhar
                </h2>
                <h3 className="text-gray-200 mb-3">(RA1911003030288)</h3>
                <h3 className="text-gray-200 mb-3">UI and Frontend Dev</h3>
                <p className="mb-4">
                  He provided a vision of how things will operate throughout implementation and worked with APIs to help us see our application more clearly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
