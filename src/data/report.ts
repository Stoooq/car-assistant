"only server";

import db from "@/lib/db";

export const getReportByUserId = async (userId: string) => {
	try {
		const report = await db.report.findFirst({
			where: { userId },
			include: { car: true },
		});
		return report;
	} catch {
		return null;
	}
};

export const getReportByReportId = async (reportId: string) => {
	try {
		const report = await db.report.findFirst({
			where: { id: reportId },
			include: { car: true },
		});
		return report;
	} catch {
		return null;
	}
};

export const getAllReports = async (userId: string) => {
	try {
		const reports = await db.report.findMany({
			where: { userId },
			orderBy: { updatedAt: "desc" },
			include: { car: true },
		});
		return reports;
	} catch {
		return null;
	}
};

export const getLastReport = async (userId: string) => {
	try {
		const report = await db.report.findFirst({
			where: { userId },
			orderBy: { updatedAt: "desc" },
			include: { car: true },
		});
		return report;
	} catch {
		return null;
	}
};
