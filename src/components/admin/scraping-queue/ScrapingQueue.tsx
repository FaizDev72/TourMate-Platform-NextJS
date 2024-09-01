"use client";
import { apiClient } from "@/lib";
import { ADMIN_API_ROUTES } from "@/utils";
import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const ScrapingQueue = () => {
  const [onGoingJobs, setOnGoingJobs] = useState(0);
  useEffect(() => {
    const getData = async () => {
      const response = await apiClient(ADMIN_API_ROUTES.JOB_DETAILS);
      setOnGoingJobs(response.data.onGoingjobs);
      console.log(response?.data?.onGoingjobs);
    };

    const interval = setInterval(() => getData(), 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onGoingJobColor = () => {
    if (onGoingJobs <= 5) return "bg-green-500";
    else if (onGoingJobs <= 10) return "bg-orange-500";
    else return "bg-red-500";
  };

  const onGoingJobTextColor = () => {
    if (onGoingJobs <= 5) return "text-green-500";
    else if (onGoingJobs <= 10) return "text-orange-500";
    else return "text-red-500";
  };
  return (
    <Card>
      <CardBody className="flex items-center justify-center">
        <div
          className={`${onGoingJobColor()} w-52 h-52 rounded-full flex items-center justify-center`}
        >
          <div className="bg-white w-40 h-40 rounded-full flex items-center justify-center">
            <span className={`${onGoingJobTextColor()} text-6xl font-bold`}>
              {onGoingJobs}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ScrapingQueue;
