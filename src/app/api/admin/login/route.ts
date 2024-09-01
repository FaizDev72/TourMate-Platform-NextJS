import { NextResponse } from "next/server";
import { prisma } from '@/lib'
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { SHA256 as sha256 } from "crypto-js";

const alg = "HS256"

const secret_key = new TextEncoder().encode(process.env.JWT_KEY as string);

const createToken = async (email: string, userId: number) => {
    return await new SignJWT({ email, userId, isAdmin: true })
        .setProtectedHeader({ alg })
        .setExpirationTime("48h")
        .sign(secret_key)
}

export async function POST(request: Request) {
    const { email, password }: { email: string; password: string } = await request.json();

    if (!email || !password) {
        return NextResponse.json(
            { message: "Email or Password are required" },
            { status: 400 }
        )
    }
    try {
        const user = await prisma.admin.findUnique({ where: { email, password: sha256(password).toString() } });

        console.log(23423)
        if (!user) {
            return NextResponse.json(
                { message: "User does not exits" },
                { status: 404 }
            )
        } else {
            const token = await createToken(user.email, user.id);
            cookies().set("access_token", token);

            return NextResponse.json({
                userInfo: {
                    id: user.id,
                    email: user.email,
                }
            })
        }

    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { message: "Unexpected Error Occured" },
            { status: 500 }
        )
    }
}