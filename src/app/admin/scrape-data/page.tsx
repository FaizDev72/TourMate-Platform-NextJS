"use client";
import ScrapingQueue from "@/components/admin/scraping-queue/ScrapingQueue";
import { apiClient } from "@/lib";
import { ADMIN_API_ROUTES } from "@/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Listbox,
  ListboxItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CurrentlyScrapingTable } from "./components/currently-scraping-table";

const ScrapeTrips = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [jobs, setJobs] = useState([]);

  async function searchCities(searchQuery: string) {
    console.log(searchQuery);
    const response = await axios.get(
      `https://secure.geonames.org/searchJSON?q=${searchQuery}&maxRows=5&username=kishan&style=SHORT`
    );
    console.log(response?.data?.geonames);
    setCities(
      response?.data?.geonames.map((city: { name: string }) => city?.name) ?? []
    );
  }

  async function startScraping() {
    await apiClient.post(ADMIN_API_ROUTES.CREATE_JOB, {
      url: `https://packages.yatra.com/holidays/intl/search.htm?destination=${selectedCity}`,
      jobType: { type: "location" },
    });
  }

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient(ADMIN_API_ROUTES.JOB_DETAILS);
      setJobs(response.data.jobs);
      console.log(response?.data?.onGoingjobs);
    };

    const interval = setInterval(() => getData(), 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="m-10 grid grid-cols-3 gap-5">
      <Card className="col-span-2">
        <CardBody>
          <Tabs>
            <Tab key="location" title="location">
              <Input
                type="text"
                label="Location"
                className=""
                onChange={(e) => searchCities(e.target.value)}
              />

              <div className="w-full min-h-[200px] max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mt-5">
                <Listbox
                  aria-label="Actions"
                  onAction={(key) => setSelectedCity(cities[key as number])}
                >
                  {cities.map((city: string, index) => (
                    <ListboxItem
                      key={index}
                      color="primary"
                      className="text-primary-500"
                    >
                      {city}
                    </ListboxItem>
                  ))}
                </Listbox>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter className="flex flex-col items-center justify-center gap-3">
          <div>{selectedCity && <h1>Scrape data for {selectedCity}</h1>}</div>
          <Button
            size="lg"
            className="w-full"
            color="primary"
            onClick={startScraping}
          >
            Scrape Data
          </Button>
        </CardFooter>
      </Card>
      <ScrapingQueue />
      <div className="col-span-3">
        <CurrentlyScrapingTable jobs={jobs} />
      </div>
    </section>
  );
};

export default ScrapeTrips;
