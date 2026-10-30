import amqp from "amqplib";

export async function startUserConsumer() {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://gameshelf:gameshelf_local_2026@localhost:5672"
  );

  const channel = await connection.createChannel();

  await channel.assertExchange("gameshelf.events", "topic", { durable: true });

  const queue = "gameshelf.user.created";

  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, "gameshelf.events", "usuario.creado");

  await channel.consume(queue, (message) => {
    if (!message) return;

    const user = JSON.parse(message.content.toString());

    console.log(
      `[RabbitMQ] Usuario creado: ${user.username} (${user.id})`
    );

    channel.ack(message);
  });

  console.log("Games Service escuchando eventos usuario.creado");
}
