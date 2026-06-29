export class ApiError extends Error {
    public status: number;
    public detail: string;

    constructor(status: number, detail: string) {
        super(detail ? detail : "API Error");
        this.name = "ApiError";
        this.status = status;
        this.detail = detail;
    }
}