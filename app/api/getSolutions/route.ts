import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const puzzleNum = searchParams.get('puzzleNum');

  if (!puzzleNum) {
    return NextResponse.json(
      { error: 'no puzzle number passed in' },
      { status: 400 }
    );
  }

  let browser = null;
  try {
    browser = await puppeteer.launch();
    console.log('launced browser');

    const page = await browser.newPage();
    console.log('opened new page');

    await page.goto(`https://www.sbsolver.com/y/${puzzleNum}`, {
      waitUntil: 'domcontentloaded',
    });
    console.log('goto site');

    console.log('getting letters...');
    const letters = await page.evaluate(() => {
      const inputElement = document.querySelector('#string');
      const value = inputElement
        ? (inputElement as HTMLInputElement).value
        : '';
      return value.toLowerCase().split('');
    });

    console.log('getting solutions...');
    const solutions = await page.evaluate(() => {
      const beeSet = document.querySelector('.bee-set');
      if (!beeSet) return null;

      const rows = beeSet.querySelectorAll('tr');
      if (!rows || rows.length === 0) return null;

      return Array.from(rows)
        .slice(1)
        .map((tr) => {
          const hoverElement = tr.querySelector('.bee-hover');
          const word = hoverElement
            ? (hoverElement as HTMLElement).innerText.toLowerCase()
            : '';
          const isPangram = tr.querySelector('.bee-note') !== null;
          return { word, isPangram };
        })
        .filter((solution) => solution.word !== '');
    });

    if (!solutions) {
      return NextResponse.json(
        { error: 'Failed to extract solutions' },
        { status: 500 }
      );
    }

    return NextResponse.json({ letters, solutions });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Error occurred while fetching solutions',
      },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
      console.log('browser closed');
    }
  }
}
