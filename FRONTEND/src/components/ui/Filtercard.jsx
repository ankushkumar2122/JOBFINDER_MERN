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
  // {
  //   filterType: "Salary",
  //   array: ["0-40k", "42-1lakh", "1lakh-5lakh"],
  // },
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
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg ">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index - idx}`;
              return (
                <div className="flex items-center space-x-2 mt-1">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
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
