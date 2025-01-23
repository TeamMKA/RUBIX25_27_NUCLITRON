import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const Display = () => {
  const AncientPeriod = [
    {
      link: "https://example.com",
      title: "Vedic Age",
      image_src:
        "https://i.pinimg.com/1200x/7c/51/26/7c5126956e1faa734a6694c16f108f78.jpg",
    },
    {
      link: "https://example.com",
      title: "Dravidian Folk Religion",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Dravidian_-Tamil_Folk_Deity_Aiyanar_with_his_wives.jpg/1200px-Dravidian-_Tamil_Folk_Deity_Aiyanar_with_his_wives.jpg",
    },
    {
      link: "example.com",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/On_The_River_Benares_ca_1883.jpg/1200px-On_The_River_Benares_ca_1883.jpg",
      title: "Vedanga",
    },
    {
      link: "example.com",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Standing_Buddha_Installed_by_Buddist_Monk_Yasadinna_-Circa_5th_Century_CE-Jamalpur_Mound-ACCN_00-A-5-Government_Museum_Mathura_Golden_background.jpg/1200px-Standing_Buddha_Installed_by_Buddist_Monk_Yasadinna-Circa_5th_Century_CE-Jamalpur_Mound-ACCN_00-A-5-_Government_Museum_Mathura_Golden_background.jpg",
      title: "Gupta Period",
    },
    {
      link: "example.com",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ajanta_Padmapani.jpg/1200px-Ajanta_Padmapani.jpg",
      title: "Golden Age of India",
    },
  ];

  const MedievalPeriod = [
    {
      link: "https://example.com",
      title: "Delhi Sultanate begins",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Sultan_Osman.jpg/1200px-Sultan_Osman.jpg",
    },
    {
      link: "https://example.com",
      title: "Qutub Minarate",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Kuttull_Minor%2C_Delhi._The_Qutb_Minar%2C_an_aquatint_by_Thomas_Daniell%2C_1805.jpg/1200px-Kuttull_Minor%2C_Delhi._The_Qutb_Minar%2C_an_aquatint_by_Thomas_Daniell%2C_1805.jpg",
    },
    {
      link: "example.com",
      image_src:
        "https://i.pinimg.com/1200x/88/b4/7c/88b47cdc7dcde91b015c8baa95198f81.jpg",
      title: "Mongol conquest of Kashmir",
    },
    {
      link: "example.com",
      image_src:
        "https://i.pinimg.com/1200x/5f/18/5d/5f185d9e03c72a328a5be693aea47c48.jpg",
      title: "Khalji dynasty",
    },
    {
      link: "example.com",
      image_src:
        "https://i.pinimg.com/1200x/3e/58/76/3e587669a71f5a5da3d6d122b2335561.jpg",
      title: "Battle of Amroha",
    },
  ];

  const ModernPeriod = [
    {
      link: "https://example.com",
      title: "Partition of India",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/A_refugee_special_train_at_Ambala_Station_during_partition_of_India.jpg/1200px-A_refugee_special_train_at_Ambala_Station_during_partition_of_India.jpg",
    },
    {
      link: "https://example.com",
      title: "Assassination of Mahatma Gandhi",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Trial_of_persons_accused_of_participation_and_complicity_in_Gandhi%27s_assassination_in_the_Special_Court_in_Red_Fort_Delhi.jpg/1200px-Trial_of_persons_accused_of_participation_and_complicity_in_Gandhi%27s_assassination_in_the_Special_Court_in_Red_Fort_Delhi.jpg",
    },
    {
      link: "example.com",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_Constituent_Assembly_of_India_meeting_in_1950.jpg/1200px-A_Constituent_Assembly_of_India_meeting_in_1950.jpg",
      title: "Constitution of India",
    },
    {
      link: "example.com",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/7/77/Pakistani_Army_Position%2C_1965_War_Footage_2.png",
      title: "Second India–Pakistan War",
    },
    {
      link: "example.com",
      image_src:
        "https://i.pinimg.com/1200x/18/89/55/188955b5655cc39608a914ddacb82bb1.jpg",
      title: "Smiling Buddha: First Nuclear Test India",
    },
  ];

  return (
    <section className="relative bg-black-100 max-w-7xl w-full mx-auto  overflow-clip mt-12 py-20">
      <h1 className="heading mb-3" style={{ lineHeight: "3.5rem" }}>
        {" "}
        Journey Through Time: <br />{" "}
        <span className="text-yellow-400">Explore Key Eras in History</span>
      </h1>

      {/* Ancient Period */}
      <div className="my-12 p-5 flex flex-col justify-start items-start gap-4 ">
        <h1 className="text-3xl font-bold ">Ancient History</h1>
        <p className="text-xl text-yellow-400 ml-4 ">3000 BCE - 500 CE</p>
      </div>

      <div className="p-5 h-full w-full">
        <div className="h-full rounded-md flex flex-col antialiased bg-white dark:bg-black-100 dark:bg-grid-white/[0.01] items-center justify-start relative overflow-hidden">
          <InfiniteMovingCards
            items={AncientPeriod}
            direction="right"
            speed="slow"
          />
        </div>
      </div>

      {/* Medival Period */}

      <div className="my-12 p-5 flex flex-col justify-start items-start gap-4 ">
        <h1 className="text-3xl font-bold ">Medieval Period</h1>
        <p className="text-xl text-yellow-400 ml-4 ">500 - 1500</p>
      </div>

      <div className="p-5 h-full w-full">
        <div className="h-full rounded-md flex flex-col antialiased bg-white dark:bg-black-100 dark:bg-grid-white/[0.01] items-center justify-start relative overflow-hidden">
          <InfiniteMovingCards
            items={MedievalPeriod}
            direction="right"
            speed="slow"
          />
        </div>
      </div>

      {/* Modern Period */}

      <div className="my-12 p-5 flex flex-col justify-start items-start gap-4 ">
        <h1 className="text-3xl font-bold ">Modern Period</h1>
        <p className="text-xl text-yellow-400 ml-4 ">1500 - Present</p>
      </div>

      <div className="p-5 h-full w-full">
        <div className="h-full rounded-md flex flex-col antialiased bg-white dark:bg-black-100 dark:bg-grid-white/[0.01] items-center justify-start relative overflow-hidden">
          <InfiniteMovingCards
            items={ModernPeriod}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Display;
