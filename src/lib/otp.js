import { randomInt } from "crypto";
import { hash, compare } from "bcryptjs";
import { addMinutes, isBefore } from "date-fns";
import { prisma } from "./prisma";

const OTP_VALIDITY_MINUTES = 10;

export function generateOtp() {
  return Array.from({ length: 6 })
    .map(() => randomInt(0, 10))
    .join("");
}

export async function createOtp(email) {
  const otp = generateOtp();
  const otpHash = await hash(otp, 10);
  const expiresAt = addMinutes(new Date(), OTP_VALIDITY_MINUTES);

  await prisma.emailOtp.create({
    data: {
      email: email.toLowerCase(),
      otpHash,
      expiresAt,
    },
  });

  return { otp, expiresAt };
}

export async function verifyOtp(email, otp) {
  const record = await prisma.emailOtp.findFirst({
    where: {
      email: email.toLowerCase(),
      consumed: false,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    return { valid: false, reason: "OTP not found" };
  }

  if (isBefore(record.expiresAt, new Date())) {
    return { valid: false, reason: "OTP expired" };
  }

  const matches = await compare(otp, record.otpHash);

  if (!matches) {
    return { valid: false, reason: "Invalid OTP" };
  }

  await prisma.emailOtp.update({
    where: { id: record.id },
    data: { consumed: true },
  });

  return { valid: true };
}
