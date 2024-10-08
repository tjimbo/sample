FROM amazoncorretto:21-alpine3.19-jdk as build
WORKDIR /app

COPY gradle gradle
COPY build.gradle.kts settings.gradle.kts gradlew ./
COPY src src

RUN ./gradlew build -x test
RUN mkdir -p build/libs/dependency && (cd build/libs/dependency; jar -xf ../*.jar)

FROM amazoncorretto:21-alpine3.19-jdk
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/build/libs/dependency

ENV SPRING_PROFILES_ACTIVE=ecs

COPY --from=build /app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]

EXPOSE 80