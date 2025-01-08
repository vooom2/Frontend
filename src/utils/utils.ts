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
