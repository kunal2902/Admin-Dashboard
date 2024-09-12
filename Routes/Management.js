import express from 'express'
import { getAdmins, getAffiliateStats } from '../Controllers/Management.js';

const router=express.Router()

router.get("/admin",getAdmins)
router.get("/performance/:id",getAffiliateStats)

export default router;