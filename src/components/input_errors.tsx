const InputError = ({ message }: { message?: string }) => {
    return (
        <span className="text-xs text-red-500">{message ?? "This field is required"}</span>
    )
}

export default InputError;