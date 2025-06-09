
import './page.css';
import data from "@/common/navbarData.json";

export default function Home() {
  return (
    <div>
      <h1 className="mainHeading_m text-center">Module V</h1>
      <hr />
      <div className="p-4 div_m">
        <ul className="list-disc list-inside">
          {Object.entries(data).map(([levelKey, levelValue]) => (
            <li key={levelKey} className="font-bold text-lg l1_m">
              <span className='heading1'>
                {levelKey}
              </span>
              <ul className="list-disc list-inside ml-4">
                {Object.entries(levelValue).map(([categoryKey, categoryValue]) => (
                  <li key={categoryKey} className="font-semibold text-md l2_m">
                    <span className='heading2'>{categoryKey}</span>
                    <ul className="list-disc list-inside ml-8">
                      {Object.entries(categoryValue).map(([activityKey, activityValue]) => (
                        <li key={activityKey} className="text-sm l3_m">
                          {activityKey} - <a href={activityValue.link} className="text-blue-500 underline">
                            {activityValue.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
