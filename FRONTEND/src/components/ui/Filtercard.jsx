import { Label } from "@radix-ui/react-label";
import { RadioGroup } from "@radix-ui/react-radio-group";
import React, { useEffect, useState } from "react";
import { RadioGroupItem } from "./radio-group";
import { useDispatch } from "react-redux";
import { setSerchTitle } from "@/redux/JobSlice";

const filterData = [
  {
    filterType: "Title",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Mobile App Developer",
      "Python Developer",
      "Data Analyst",
      "DevOps Engineer",
        "Software Developer",
    ],
  },
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Chennai",
      "Kolkata",
      "Remote",
      "Noida",
      "Gurgaon",
    ],
  },
];

const Filtercard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSerchTitle(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-sm border border-gray-200">
      <h1 className="font-bold text-lg mb-3">Filter Jobs</h1>
      <hr className="mb-4" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-semibold text-sm mb-2">{data.filterType}</h2>
            {data.array.map((item, idx) => {
              const itemId = `id-${data.filterType}-${idx}`;
              return (
                <div className="flex items-center space-x-2 mb-1" key={itemId}>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className="text-sm">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filtercard;
