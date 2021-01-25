import {Injectable, InternalServerErrorException} from '@nestjs/common';
import { Browser, launch, PDFFormat } from 'puppeteer';
import {logger} from '../utils/logger';

@Injectable()
export class HeadlessChromeService {
  private browser: Browser | undefined;

  async generatePdf(
    pageInfo: {htmlTemplate: string, style?: string},
    pageSize: {format: PDFFormat, width?: string | number, height?: string| number},
  ) {
    logger.info('[generate-pdf] Started service method for generate a pdf with params: '
        + `pageInfo = {htmlTemplate: '${pageInfo.htmlTemplate}', style: '${pageInfo.style}'}`
        + ` and pageSize = {format: '${pageSize.format}', width: ${pageSize.width}, height: ${pageSize.height}}`);
    if (!this.browser) {
      logger.info('[generate-pdf] Try to launch browser');
      this.browser = await this.launchBrowser();
    }
    logger.info('[generate-pdf] Browser was launched!');
    const page = await this.browser.newPage();
    logger.warn('[generate-pdf] Created new web page!');
    await page.setContent(pageInfo.htmlTemplate);
    logger.info('[generate-pdf] Successfully setup html like a web page content!');
    if (pageInfo.style) {
      await page.addStyleTag({ content: pageInfo.style });
      logger.info('[generate-pdf] Added style to the web page!');
    }
    const pdf: Buffer = await page.pdf({ ...pageSize, printBackground: true });
    logger.info(`[generate-pdf] Created new pdf page with Buffer - '${JSON.stringify(pdf)}'`);
    await page.close();
    logger.warn(`[generate-pdf] Closed web page!`);
    await this.closeBrowser();
    logger.info('[generate-pdf] Browser was closed!');
    return pdf;
  }

  private async closeBrowser(): Promise<void> {
    try {
      logger.info('[browser] Start the method for close a headless chrome!');
      if (this.browser) {
        logger.info('[browser] The Chrome is running!');
        const pages = await this.browser.pages();
        logger.info(`[browser] Open pages - ${pages.toString()}`);
        if (!pages.length) {
          logger.warn('[browser] Try to close a headless chrome!');
          await this.browser.close();
          logger.warn('[browser] The headless chrome closed!');
        }
      }
    } catch (err) {
      logger.error(`[browser] Error on close a headless chrome! The error info - '
      ${err.toString()}', throw error - ${'ERROR_ISSUE_ON_CLOSE_HEADLESS_CHROME'}`);
      throw new InternalServerErrorException('ERROR_ISSUE_ON_CLOSE_HEADLESS_CHROME', err);
    }
  }

  private async launchBrowser(): Promise<Browser> {
    try {
      logger.warn('[browser] Launch a headless chrome!');
      return await launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {
          width: 1920,
          height: 1024,
          isMobile: false,
        },
      });
    } catch (err) {
      logger.error(`[browser] Error on launch a headless chrome! The error info - '${err.toString()}
      ', throw error - ${'ERROR_ISSUE_ON_LAUNCH_HEADLESS_CHROME'}`);
      throw new InternalServerErrorException('ERROR_ISSUE_ON_LAUNCH_HEADLESS_CHROME', err);
    }
  }
}
