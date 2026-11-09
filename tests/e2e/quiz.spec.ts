import { expect, test, type Page } from '@playwright/test';

async function completeLevel(page: Page, answers: string[], level: number) {
  for (const answer of answers) {
    await page.getByRole('button', { name: answer }).click();
  }

  await page.getByRole('button', { name: 'Klaar!' }).click();

  const continueButton = page.getByRole('button', {
    name: 'Doorgaan',
  });

  await expect(continueButton).toBeVisible();
  await continueButton.click();

  await expect(
    page.getByRole('dialog', {
      name: `Level ${level} voltooid!`,
    }),
  ).toBeVisible();
}

async function startNextLevel(page: Page) {
  await page.getByRole('button', { name: 'Volgend level' }).click();
}

test.describe('Quiz page', () => {
  test('completes all levels with a perfect score and restarts the quiz', async ({
    page,
  }) => {
    const response = await page.goto('/');

    // Home page
    expect(response?.status()).toBe(200);

    await expect(
      page.getByRole('heading', {
        name: 'Duid de 3 dingen aan die niet',
      }),
    ).toBeVisible();

    // Level 1
    await completeLevel(page, ['Pepperoni', 'Gehaktballen', 'Hesp'], 1);

    await startNextLevel(page);

    // Level 2
    await expect(
      page.getByRole('button', {
        name: 'Koorts van de patiënt meten',
      }),
    ).toBeVisible();

    await completeLevel(
      page,
      ['Koorts van de patiënt meten', 'De wonde naaien', 'Brand blussen'],
      2,
    );

    await startNextLevel(page);

    // Level 3
    await expect(
      page.getByRole('button', {
        name: 'Landingsgestel is niet geolied',
      }),
    ).toBeVisible();

    await completeLevel(page, ['Landingsgestel is niet geolied'], 3);

    // Quiz completed
    await expect(page.getByRole('dialog')).toBeVisible();

    await expect(page.getByText('Jouw score: 3 van 3.')).toBeVisible();

    const restartButton = page.getByRole('button', {
      name: 'Opnieuw',
    });

    await expect(restartButton).toBeVisible();
    await restartButton.click();

    // Restart quiz
    await expect(
      page.getByRole('heading', {
        name: 'Duid de 3 dingen aan die niet',
      }),
    ).toBeVisible();
  });

  test('completes the quiz with one incorrect level', async ({ page }) => {
    await page.goto('/');

    // Level 1 - One incorrect answer
    await completeLevel(page, ['Deeg', 'Pepperoni', 'Gehaktballen'], 1);

    await startNextLevel(page);

    // Level 2 - All correct answers
    await completeLevel(
      page,
      ['Koorts van de patiënt meten', 'De wonde naaien', 'Brand blussen'],
      2,
    );

    await startNextLevel(page);

    // Level 3 - Correct answer
    await completeLevel(page, ['Landingsgestel is niet geolied'], 3);

    // Quiz completed - One incorrect level
    await expect(page.getByRole('dialog')).toBeVisible();

    await expect(page.getByText('Jouw score: 2 van 3.')).toBeVisible();
  });
});
