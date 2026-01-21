import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const fetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id,name");

      if (error) {
        console.error("Error fetching categories: ", error);
        setError(error);
      } else {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);
  return {categories,error};
};
