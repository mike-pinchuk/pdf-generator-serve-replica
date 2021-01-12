import {typedEnv} from "./utils/typed-env";

import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
import {expressMiddleware} from "cls-rtracer";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(expressMiddleware());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    const options = new DocumentBuilder()
        .setTitle('Pdf generator')
        .setDescription('The server with ability to generate pdf from html')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(typedEnv.PORT);
}

bootstrap();
