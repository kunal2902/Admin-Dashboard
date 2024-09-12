import express from 'express'
import { getOverview } from '../Controllers/Sales.js';

const router=express.Router()

router.get("/overview",getOverview)
// router.get("/daily",getOverview)

export default router;