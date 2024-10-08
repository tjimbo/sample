const taskDef = require('./ecs-task-def.json')

const imageUrl = taskDef.containerDefinitions[0].image.split(':')
taskDef.containerDefinitions[0].image = `${imageUrl[0]}:{{ must_env \`IMAGE_TAG\` }}`

console.log(JSON.stringify(taskDef, null, 2))