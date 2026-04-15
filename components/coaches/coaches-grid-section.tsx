"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import CoachCard from "../coach-card";
import { getApiUrl } from "@/lib/api";

const categories = [
  "All Career Path",
  "Data Science",
  "Project Management",
  "Cybersecurity",
  "Data Analytics",
  "Business Analysis",
  "Data Engineering",
  "SOC Analysis",
  "Ethical Hacking",
];

const allCoachesData = [
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    name: "Abdullahi Muhammed",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Science",
    specialtyColor: "#A2CE3A",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    name: "Mary Jane",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Cybersecurity",
    specialtyColor: "#90EE90",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    name: "Andy Jones",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Project Management",
    specialtyColor: "#87CEEB",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    name: "Gifted Isaac",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Science",
    specialtyColor: "#A2CE3A",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop",
    name: "Gifted Isaac",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Science",
    specialtyColor: "#A2CE3A",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    name: "Andy Jones",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Project Management",
    specialtyColor: "#87CEEB",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    name: "Abdullahi Muhammed",
    rating: 4.9,
    tag: "Top Human Coach",
    tagColor: "#A2CE3A",
    specialty: "Technical",
    specialtyColor: "#FFA500",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    name: "Abdullahi Muhammed",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Science",
    specialtyColor: "#A2CE3A",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    name: "Abdullahi Muhammed",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Cybersecurity",
    specialtyColor: "#90EE90",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    name: "Abdullahi Muhammed",
    rating: 4.9,
    tag: "Top Human Coach",
    tagColor: "#A2CE3A",
    specialty: "Technical",
    specialtyColor: "#FFA500",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    name: "Gifted Isaac",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Science",
    specialtyColor: "#A2CE3A",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop",
    name: "Andy Jones",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Project Management",
    specialtyColor: "#87CEEB",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    name: "Abdullahi Muhammed",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Analytics",
    specialtyColor: "#FFB6C1",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    name: "Abdullahi Muhammed",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Business Analysis",
    specialtyColor: "#DDA0DD",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    name: "Abdullahi Muhammed",
    rating: 4.9,
    tag: "Top Human Coach",
    tagColor: "#A2CE3A",
    specialty: "Technical",
    specialtyColor: "#FFA500",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    name: "Abdullahi Muhammed",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Science",
    specialtyColor: "#A2CE3A",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    name: "Gifted Isaac",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Science",
    specialtyColor: "#A2CE3A",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    name: "Andy Jones",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Engineering",
    specialtyColor: "#98FB98",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop",
    name: "Abdullahi Muhammed",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "SOC Analysis",
    specialtyColor: "#FFD700",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    name: "Abdullahi Muhammed",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Ethical Hacking",
    specialtyColor: "#FF6347",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    name: "Gifted Isaac",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Science",
    specialtyColor: "#A2CE3A",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    name: "Andy Jones",
    rating: 4.9,
    tag: "Top Behavioral Coach",
    tagColor: "#A2CE3A",
    specialty: "Project Management",
    specialtyColor: "#87CEEB",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    name: "Abdullahi Muhammed",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Cybersecurity",
    specialtyColor: "#90EE90",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    name: "Gifted Isaac",
    rating: 4.9,
    tag: "Top Technical Coach",
    tagColor: "#A2CE3A",
    specialty: "Data Analytics",
    specialtyColor: "#FFB6C1",
    sessionCount: "100+ Interview Prep Sessions",
    hiredCount: "10+ more got hired",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    ],
  },
];

const COACHES_PER_PAGE = 12;

interface CoachesGridSectionProps {
  debouncedSearch: string;
}

interface Coach {
  id: number;
  name: string;
  image_url: string;
  username: string;
  job_title: string;
  country: string;
}

interface CoachesResponse {
  data: Coach[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export default function CoachesGridSection({
  debouncedSearch,
}: CoachesGridSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All Career Path");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch coaches from API
  const { data: coachesResponse, isLoading, error } = useQuery<CoachesResponse>({
    queryKey: ["coaches", currentPage, debouncedSearch, activeCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (activeCategory !== "All Career Path") params.append("category", activeCategory);
      
      const response = await fetch(`${getApiUrl()}/api/coaches?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch coaches");
      return response.json();
    },
  });

  const coaches = coachesResponse?.data || [];
  const totalPages = coachesResponse?.meta?.last_page || 1;

  // Transform API data to match CoachCard props
  const transformedCoaches = useMemo(() => {
    return coaches.map((coach) => ({
      image: coach.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      name: coach.name,
      rating: 4.9,
      tag: "Top Coach",
      tagColor: "#A2CE3A",
      specialty: coach.job_title || "Professional Coach",
      specialtyColor: "#A2CE3A",
      sessionCount: "Interview Prep Sessions",
      hiredCount: "Helped clients get hired",
      avatars: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      ],
      id: coach.id,
      username: coach.username,
      country: coach.country,
    }));
  }, [coaches]);

  // Reset page when filters change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
      className="relative bg-[#0B0D0F] py-8 lg:py-12"
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        {/* Category Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex gap-4 lg:gap-8 overflow-x-auto pb-4 lg:pb-5 mb-6 lg:mb-8 border-b border-[#FFFFFF1A]"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`whitespace-nowrap text-sm font-mona-sans font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "text-white"
                  : "text-[#FFFFFF80] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A2CE3A]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-red-400 text-lg font-mona-sans">
              Failed to load coaches. Please try again.
            </p>
          </div>
        )}

        {/* Coaches Grid */}
        {!isLoading && !error && (
          <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${currentPage}-${debouncedSearch}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {transformedCoaches.map((coach, index) => (
              <motion.div
                key={`${coach.id}-${coach.username}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
              >
                <CoachCard {...coach} />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {transformedCoaches.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <p className="text-white/60 text-lg font-mona-sans">
                No coaches found matching your criteria.
              </p>
            </motion.div>
          )}
          </AnimatePresence>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mt-12"
          >
            {/* Previous Arrow */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white disabled:opacity-30 transition-all"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-mona-sans font-semibold transition-all duration-300 ${
                  currentPage === page
                    ? "bg-[#A2CE3A] text-[#0B0D0F]"
                    : "bg-[#FFFFFF1A] text-white hover:bg-[#FFFFFF33]"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Arrow */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white disabled:opacity-30 transition-all"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>

      {/* Hide scrollbar for category filter */}
      <style jsx>{`
        div[class*="overflow-x-auto"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.section>
  );
}
