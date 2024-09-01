import { prisma } from '@/lib'
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { url, jobType } = await request.json();

        if (!url || !jobType) {
            NextResponse.json(
                { message: "Empty url or job-type" },
                { status: 400 }
            )
        }

        const response = await prisma.jobs.create({ data: { url, jobType } });

        return NextResponse.json(
            { jobCreated: true },
            { status: 201 }
        )

    } catch (error) {
        NextResponse.json(
            { message: "Unexpected Error Occured" },
            { status: 500 }
        )
    }
}