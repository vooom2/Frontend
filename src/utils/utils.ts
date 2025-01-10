import notify from "./toast";

export const validateFile = (file: File, maxSize: number, acceptedTypes: string[]): boolean => {

    if (file.size > maxSize * 1024 * 1024) {
        notify(`File size must be less than ${maxSize}MB`, "error");
        return false;
    }

    if (!acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
            return file.type.startsWith(type.slice(0, -2));
        }
        return file.type === type;
    })) {
        notify(`Accepted file types: ${acceptedTypes.join(', ')}`, "error");
        return false;
    }
    return true;
};


const formatFriendlyDate = (dateString: string): string => {
    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }
  
  const addOrdinalSuffix = (dateString: string): string => {
    return dateString.replace(/(\d+)/, (match) => {
      const num = parseInt(match);
      const j = num % 10;
      const k = num % 100;
      
      if (j === 1 && k !== 11) return num + "st";
      if (j === 2 && k !== 12) return num + "nd";
      if (j === 3 && k !== 13) return num + "rd";
      return num + "th";
    });
  }
  
  export const getLocalFriendlyDate = (dateString: string): string => {
    const formattedDate = formatFriendlyDate(dateString);
    return addOrdinalSuffix(formattedDate);
  }
  