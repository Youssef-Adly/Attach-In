export function formatDateForPost(dateString) {
  const then = new Date(dateString);
  const now = new Date();

  const diffInMs = Math.abs(now - then);
  const diffInSecs = diffInMs / 1000;
  const diffInMins = diffInSecs / 60;
  const diffInHours = diffInMins / 60;
  const diffInDays = diffInHours / 24;
  const diffInMonths = diffInDays / 30;
  const diffInYears = diffInDays / 365;

  if (diffInSecs < 60) {
    return `Just now`;
  } else if (diffInMins < 60) {
    return `${Math.floor(diffInMins)} minute${diffInMins !== 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hour${diffInHours !== 1 ? "s" : ""} ago`;
  } else if (diffInDays < 30) {
    return `${Math.floor(diffInDays)} day${diffInDays !== 1 ? "s" : ""} ago`;
  } else if (diffInMonths < 12) {
    return `${Math.floor(diffInMonths)} month${
      diffInMonths !== 1 ? "s" : ""
    } ago`;
  } else {
    return `${Math.floor(diffInYears)} year${diffInYears !== 1 ? "s" : ""} ago`;
  }
}

export function getGreeting() {
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    return "Good Morning ";
  } else if (hours < 18) {
    return "Good Afternoon ";
  } else {
    return "Good Evening ";
  }
}

export function convertLinksToAnchors(text) {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^ ]+)/g;

  // Replace URLs with anchor tags
  return text.replace(urlRegex, (match) => {
    return `<a href="${match}" target="_blank">${match} </a>`;
  });
}
