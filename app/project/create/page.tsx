"use client";
import customFetch from "@/app/helpers/customFetch";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    homeownerName: "",
    homeownerPhone: "",
    homeownerEmail: "",
    homeownerAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await customFetch("/api/projects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ""
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const project = await response.json();
      console.log(project);
      alert("Project created successfully!");
      window.location.href = `/`;
    } else {
      console.log(response);
    }
  };

  return (
    <Container>
      <div>
        <Heading>Add Project</Heading>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="homeownerName">Homeowner Name:</label>
            <input
              type="text"
              id="homeownerName"
              name="homeownerName"
              value={formData.homeownerName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="homeownerPhone">Homeowner Phone:</label>
            <input
              type="tel"
              id="homeownerPhone"
              name="homeownerPhone"
              value={formData.homeownerPhone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="homeownerEmail">Homeowner Email:</label>
            <input
              type="email"
              id="homeownerEmail"
              name="homeownerEmail"
              value={formData.homeownerEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="homeownerEmail">Homeowner Address:</label>
            <input
              type="text"
              id="homeownerAddress"
              name="homeownerAddress"
              value={formData.homeownerAddress}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Project</button>
        </form>
      </div>
    </Container>
  );
}
