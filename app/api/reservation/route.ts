import { NextResponse } from "next/server";

const BEDRIJFS_GUID = "6e0889dc3ea244c3bb87adacb5278f0e";

function base64Url(input: string): string {
  return Buffer.from(input, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function formatDate(date: string): string {
  // input: 2026-05-20
  return date.replaceAll("-", "");
}

function formatTime(time: string): string {
  // input: 18:30
  return time.replace(":", "") + "00";
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const segments = [
      BEDRIJFS_GUID,
      String(data.arrangementId ?? 0),
      formatTime(data.time),
      formatDate(data.date),
      String(data.guests),
      base64Url(data.email),
      base64Url(data.phone),
      base64Url(data.message ?? ""),
      base64Url(data.name),
      data.nation ?? "EN",
      String(data.waitingList ?? 0),
      String(data.requestList ?? 0),
      String(data.approval ?? 0),
      "000000",
      "000000",
      "_",
      "_",
      "8",
      data.allergens ?? "00000000000000",
    ];

    const url = `https://reserveereenvoudig.nl/AddReservering/${segments.join("/")}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": "0",
        Accept: "application/json",
      },
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Reservation API failed",
          status: response.status,
          body: text,
        },
        { status: 502 },
      );
    }

    let result: unknown;

    try {
      result = JSON.parse(text);
    } catch {
      result = text;
    }

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
