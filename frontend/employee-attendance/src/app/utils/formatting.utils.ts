// Format date to dd-MM-yyyy
export function formatDate(dateString: string | Date): string {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-GB'); // Formats to dd-MM-yyyy
  }
  
  // Format time to hh:mm AM/PM
  export function formatTime(timeString: string): string {
  
    if (!timeString) {
      return 'N/A'; // Return 'N/A' for invalid or missing time
    }
  
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes] = timeString.split(':').map(part => parseInt(part, 10));
  
    if (isNaN(hours) || isNaN(minutes)) {
      return 'N/A';
    }
  
    // Format the time to hh:mm AM/PM
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set the time on the current date
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }
  
  // Format duration to hh:mm
  export function formatDuration(duration: string | null | undefined): string {
  
    if (!duration || !duration.startsWith('PT')) {
      return 'N/A'; // Return 'N/A' for invalid or missing duration
    }
  
    // Extract hours, minutes, and seconds from ISO 8601 duration (e.g., PT6H13M47.0409723S)
    const hoursMatch = duration.match(/PT(\d+)H/); // Match hours (e.g., "6H")
    const minutesMatch = duration.match(/(\d+)M/); // Match minutes (e.g., "13M")
    const secondsMatch = duration.match(/(\d+(\.\d+)?)S/); // Match seconds (e.g., "47.0409723S")
  
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0; // Extract hours or default to 0
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0; // Extract minutes or default to 0
    const seconds = secondsMatch ? parseFloat(secondsMatch[1]) : 0; // Extract seconds or default to 0
  
    // Convert total duration to hours and minutes
    const totalMinutes = minutes + Math.floor(seconds / 60); // Add seconds converted to minutes
    const totalHours = hours + Math.floor(totalMinutes / 60); // Add minutes converted to hours
    const remainingMinutes = totalMinutes % 60;
  
    return `${totalHours}h ${remainingMinutes}m`;
  }