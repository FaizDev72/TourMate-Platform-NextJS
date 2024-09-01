import { NextResponse } from "next/server";

export async function GET() {
    try {
        const jobs = await prisma.jobs.findMany({ orderBy: { createdAt: "desc" } });
        const onGoingjobs = await prisma.jobs.findMany({ where: { isComplete: false } });

        return NextResponse.json(
            {
                jobs, onGoingjobs: onGoingjobs?.length ?? 0
            },
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}