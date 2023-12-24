import express, { Request, Response } from "express";
import { jwtHelper } from "../utils/jwtHelper.js";
const router = express.Router();

router.get("/refresh", async (req: Request, res: Response) => res.send(await jwtHelper.decodeToken(req)));

router.get("/logout", (req: Request, res: Response) => {
    res.clearCookie("ebay-retail-auth");
    res.send("Cookies Cleared Successfully");
});

export default router;
