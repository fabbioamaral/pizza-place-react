import { AlertColor } from "@mui/material/Alert/Alert"

export type SnackContent = {
    shouldDisplay: boolean,
    message: string,
    typeOfSnack: AlertColor | undefined
}