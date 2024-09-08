export const CMS_MS_TESTIMONIAL_PATTERN = {
  TCP: {
    fetchTestimonials: {
      role: "fetchTestimonials",
      cmd: "fetch-testimonials",
    },
    fetchAllTestimonial: {
      role: "fetchAllTestimonial",
      cmd: "fetch-all-testimonial",
    },
    findTestimonialById: {
      role: "findTestimonialById",
      cmd: "find-testimonial-by-id",
    },
    createTestimonial: { role: "createTestimonial", cmd: "create-testimonial" },
    updateTestimonial: { role: "updateTestimonial", cmd: "update-testimonial" },
    deleteTestimonial: { role: "deleteTestimonial", cmd: "delete-testimonial" },
    toggleTestimonialVisibility: {
      role: "toggleTestimonialVisibility",
      cmd: "toggle-testimonial-visibility",
    },
  },
  KAFKA: {
    fetchTestimonials: "fetchTestimonials",
    fetchAllTestimonial: "fetchAllTestimonial",
    findTestimonialById: "findTestimonialById",
    createTestimonial: "createTestimonial",
    updateTestimonial: "updateTestimonial",
    deleteTestimonial: "deleteTestimonial",
    toggleTestimonialVisibility: "toggleTestimonialVisibility",
  },
  REDIS: {},
  RABBITMQ: {},
};
