"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

// Define the expected type for the state parameter
type StateType = {
  // Replace these with the correct properties that `state` represents
  userId: string;
  // Add any other properties as needed
};

export const createPitch = async (
  state: StateType,   // Use the appropriate type for state
  form: FormData,     // FormData is already typed correctly in TypeScript
  pitch: string
) => {
  const session = await auth();

  if (!session) {
    console.log('User is not authenticated');
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );
  console.log('Parsed form data:', { title, description, category, link });

  const slug = slugify(title || "default-title", { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    console.log('Startup created:', result);

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error('Error during pitch creation:', error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
