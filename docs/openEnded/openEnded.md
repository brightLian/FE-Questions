# 开放性问题
## 自我介绍:star2:
面试官你好，我叫连明亮，18年毕业于东北石油大学，18年毕业后加入好大夫在线，目前担任医助开放平台事业部的前端负责人。
技术栈在简历中已经写的比较完善了，我就不过多赘述了，我简单说下我之前的工作内容吧。
在好大夫工作期间，我主要是负责公司重点、难点、战略型项目的开发和管理工作，包括好大夫的 VIP 项目、好大夫全家宝、预问诊流程、HIS 系统等项目。
也因为对项目的认真负责，获得2019年好大夫在线的优秀员工。

## 你做的最好/难的项目有哪些？:star2:
我觉得我做的比较好的项目有挺多的，那我就举一个我最近负责的项目作为例子吧。      
去年11月份我这边负责了一个预问诊开放平台的项目，因为这个项目比较重要，所以项目有 deadline。     
先说一下项目背景：这个项目主要是解决问诊过程时间长（说一下医生患者交流时的时间冲突），用户投诉率高，转化率低的问题。       
因为涉及了公司所有的核心业务，所以对项目的质量、稳定性、性能有着比较高的要求。    
同时这个项目同时也特别大。前端这边是6个人，我在这个项目中是担任前端负责人的角色。    
- 这个项目的难点主要有这些：
	- 1、开发时间比较紧，任务多：
		我这边是这样处理的，先把项目分为了不同的模块，比如医生端小程序、患者端小程序和H5、PC 等多个部分。
		然后根据组内成员的擅长，将项目打散分配给对应的人，保证项目整体时间的可控性。
	- 2、项目需求变动较多：
		首先会要求产品对每次改动给出新的需求改动文档，同时和相关人员一起对新的需求进行分析，避免出现理解不一致等问题。 
		然后我会要求测试同学做好记录，避免后期如果出现问题，产品经理对改动不认账。 
		再对改动工作量进行评估，看改动的大小决定能否内部消化，不能内部消化可以选择申请周末加班，首先保证项目按期上线。
	- 3、项目对性能要求较高：
		因为涉及到了所有的主要业务，所以对性能要求很高。
		我在团队中使用了 lighthouse、webPageTest 对主要页面进行性能优化。
	- 4、项目涉及人员较多，所以在进行 code review 时难免会出现问题：
		在开发期周进行两次的集中 review，提早发现问题。
		同时我在团队内容标准化了 eslint 和 sonarlint，对代码整体的风格和质量进行把控。
	- 5、同时还有一个我对业务的思考，如何提升转化率：
		在项目上线前，我梳理了页面的流程，使用小程序自定义分析功能对用户对留存率和转化率进行统计。
- 最后项目结果是：
	- 在产品需求频繁改动的情况下，保证了项目的按时上线。
	- 针对代码进行了严格的管理后，项目上线后产生的很少的线上 bug.
	- 项目受到了公司的认可，帮助公司降低了图文和电话的投诉率，原有投诉量约为总单量的4%，现为1.5%。
	-	利用自己定义分析功能，给产品改进提供了依据，在后续改动中提升了用户对转化率。
	- 同时团队内部成员也受到了公司和部门的一致认可。

## 在项目中遇到过哪些问题，如何解决的？:star2:
- 组内成员在使用 vue 时，子组件样式不生效问题。
	- 问题：使用 scoped 后，父组件的样式将不会渗透到子组件中，只能更改子组件根节点的样式。
	- 原因：这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。
  - 解决方式：使用深度作用选择器。父组件的样式就会渗透到自组件中。原生 Vue 使用 >>>，Sass 等预处理器无法解析时使用 /deep/。
- 组内成员开发小程序时，textarea 输入框复用问题。
	- 问题：同一个页面根据数据渲染组件时，textarea 组件中使用了 key 值，并且这个 key 值使用过数组的下标循环的，导致了组件被复用。
	- 解决方式：更改 key 值为一个数据中的关键字段。（和 React 和 Vue 中组件复用原理相同）
	- 注：微信开发者工具没有问题，但是手机就有问题，说明小程序开发者工具没有复用组件，但是手机上有这个功能。
- 在做问诊开发平台的项目时，一些数据需要存储在本地且比较大，但是还需要过期时间。
	- 问题：在项目需求中，之前搜索的一些记录涉及到了本地保存，并且七天有效。
	- 解决方式：我这边采用 localStorage + 过期时间，在每次进行操作时会先校验过期时间。	
- 全家宝项目对接时，原本是 ToC 型项目，突然转为 ToB。
	- 问题：在做一个叫全家宝的项目时，突然要对接一些合作方，同时要求能够快速上线。此外不同合作方的页面展示还不同，并且不可以根据 type 来进行区分合作方，因为会导致有些人恶意改链接，进入其他合作方页面。
	- 解决方式：我看到目前很多 ToB 的项目都是通过域名来进行区分的，所以我想我是否也可以根据域名来进行区分，但是又因为我们这里 nginx 配置修改复杂。 
		所以我改变了思路，我通过 express 来控制路由的路径，路径中的一个层级作为合作方的参数。 
		通过一个拦截器，根据路径对配置文件进行读取，来实现通过 url 路径对页面整体内容对配置。
- 在做 his 系统时，hospital.haodf.com 请求 m.haodf.com 的接口。
	- 问题：出现了跨域问题，但是在发送请求时还要携带 cookie。
	- 解决方式：前端增加 xhr.withCredentials = true
- 小程序标签排序
- 小程序中跨页面通信
- 前端单元测试

## 前端发展趋势预测？
我们知道，目前前端工程化能力已经处于比较成熟的阶段，但是如何提高开发效率，还有很远的路要走。     
那么最重要的一点就是将前端人为工作提升到自动化阶段，而自动化必然离不开的就是 AI 。     
前端如何加持 AI？其实现在已经有了一些答案，比如可以使用设计稿生成代码(imgcook)。      
同时前端智能化也会成为一个趋势，会出现更多类似于 TensorFlow.js 前端学习框架。

## 你现在在看什么书，为什么要看这些书？
- 第一本书是 JS 高级程序设计的第四版：看它主要是为了对基础知识的巩固
- 第二本书是 TensorFlow 深度学习：想对机器学习进行一定的了解
- 第三本书是 算法图解：因为自身不是科班出身，想对算法有深入的了解

## 最近在学习哪些新的技术？
- uniapp：多端开发使用，因为目前现公司准备开发支付宝小程序，所以被动学习。
- TensorFlow.js：想对人工智能方向有一定的研究。
- Vue3.0：新版本的 Vue，不过目前公司使用 Vue2.0 比较稳定，没人愿意去升级。

## 谈谈你的优缺点？
- 优点：
	- 敢于挑战：我在好大夫在线期间主要就是负责公司重点、难点项目的开发，比如全家宝项目作为项目负责人，时间紧任务重，我合理安排人员分工，最终保证项目顺利上线。
	- 工作认真负责：在去年年底有一群领导要来视察，我负责做一个展厅的项目，因为开发时间只有2天，我周末主动来加班，帮助同时解决适配大屏幕的问题，最终保证了项目的稳定。
	- 爱学习：我这边热爱学习新的技术，并且将其带到实际的工作中。比如微信小程序 kbone 的引入，用于开发 H5 和小程序，最终可以减少一半的开发人日。
- 缺点：
	- 做事没有条理性：我个人认为我做事没有条理，每天会被其他各种琐碎的事情打乱。不过我现在逐步在改正，比如我现在每天会列出我觉得最重要的5件事，优先去完成。

## 选择前端的原因？
- 对图形界面感觉更有认同感：之前对服务端也进行研究过，可做完的东西看不到实际的效果，但是前端可以看到界面更有成就感。
- 和大学期间的同学一起研究：大学期间一个同学也是搞前端的，两个人一起学习进步比较快，同时可以更好的进行技术上的沟通。
- 前端的技术更新比较快：我个人比较喜欢学习，前端正好是更新比较快的东西，比如目前 TensorFlow.js 进行人工智能的开发、Flutter 进行跨端的开发。

## 你有什么问题想要问我吗？:star2:
- 想了解下我面试的这个部门对于前端的重视程度以及在大前端时代，团队对于技术的思考。
- 我比较在意自己的技术方向和职业发展，能够简单介绍下如果我面试上贵公司职位，工作内容是怎么样的？
- 针对本次面试，我这边的不足有哪些呢？

## 对职业的规划？:star2:
- 第一阶段：在一家中型公司成为一名前端的骨干成员，提升自己的基础知识能力和解决问题的能力。
- 第二阶段：在一家大型的互联网公司逐步学习，成为一名骨干成员，不断提升自己的架构方面的能力和大型项目开发、管理的能力。
- 第三阶段：在一家中型公司成为一名前端负责人的角色，提升自己的架构、设计、管理等各方面的能力。
- 第四阶段：不断向大一点的公司前进或者作为前端负责人参加创业。

## 为什么离职？
- 第一点：想要去更大的平台进行发展，在现在的公司技术到达了瓶颈，想要自我提升。
- 第二点：自己的职业规划，想寻找新的机会提升自己，想要创造更大的价值。
- 第三点：还有一个个人原因吧，就是和女朋友的公司离得比较远，不好权衡距离。

## 你是如何看待加班的问题的？
- 加班就像借钱一样，救急不救穷。
- 在互联网公司加班是一个很正常的问题，我觉得如果项目涉及 deadline 时或者是出现风险时是完全可以加班的，但是加班不能成为常态化。
- 但是在平常工作，合理的安排工作时间和任务才是正常的，这样不仅能够提升开发效率，同时还能够提升人员的稳定性。
- 综上所述，我不排斥加班，但是我同样也是反对把加班作为常态化的情况。

## 还有其他公司的 offer 吗？
目前有一家公司的 offer，但是因为我之前对贵公司也比较认可，所以在薪酬相差不大的情况下，我肯定会优先选择贵公司。       
此外因为我这边是内推来的，所以我肯定不会辜负我的推荐人，所以我肯定会优先选择贵公司的。

## 你期望的薪水是多少？
作为一个候选人，我个人这边肯定是希望越高越好。     
在面试之前我和我的内推人沟通，说是可以在我现有工资上能提升40%-50%。      
经过几轮的技术面试，我觉得面试官对我的评价也都不错，所以我这边理想的涨幅是在40%以上。

## 你是怎么培养你的下属的？
已我最近带过的2个新人来说吧：
- 第一步：首先要带领他们熟悉团队，包括团队成员、团队分工、团队里面负责的业务以及技术栈等等。
- 第二步：根据每个人的面试情况来划分工作，并且制定合理的考核内容以及可量化的评审条件。
- 第三步：带领新人先做一个中小型的项目，熟悉一下整体的开发流程，观察下新人是否能融合到我们团队中来。
- 第四步：让新人独立完成一个中小型的项目，看是否满足预期。不满足需要和他进行沟通，指出问题。
- 第五步：逐步培养新人的开发和沟通能力，使其能更加独立的完成项目的开发。
- 第六步：融入团队后，制定合理的学习计划、分享计划，督促其不断进步，从而带领整个团队进步。

## 和前端开发相关的项目角色
产品经理、UI/UE、后端开发、移动端开发、测试人员、运维人员、

## 所在团队的工作流程？
- 产品方案准备
- 需求讲解/分析：了解需求背景、看需求是否合理、是否需要其他方向支持、看技术难度评估时间
- 技术评估/方案设计：设计文档、组内评审、项目相关人员沟通、得出结论优化设计
- SEO 评估
- UI/UE 出图 
- 计划会：给出各节点时间具体时间（包括：联调节点、测试用例节点、提测时间）
- 开发：开发文档、代码 review
- 联调：和后端、客户端联调
- 测试：提测前发邮件、测试期问题要用工具记录、复现不出来问题找测试复现（兼容性问题找其提供设备）
- 验收：UI/UE 视觉验收、产品功能验收
- 上线：

## 产品加需求怎么办？
就拿我之前作为前端负责人的一个项目（预问诊开放平台）来说，因为是一个创新型的项目，所以项目在进行中有多次改动和加需求的情况。    
我作为前端负责人，首先会要求产品对每次改动给出新的需求改动文档，同时和相关人员一起对新的需求进行分析，避免出现理解不一致等问题。    
然后我会要求测试同学做好记录，避免后期如果出现问题，产品经理对改动不认账。    
再对改动工作量进行评估，看改动的大小决定能否内部消化，不能内部消化可以选择延期或者申请周末加班，首先保证项目按期上线。   
在项目上线后我要求开会，针对产品的需求改动和需求增加作出分析，督促产品同学在下次项目开始前给出更合理的文档，避免相同的事情再次出现。    

## 和同事之间出现分歧怎么办？
- 首先不能吵架，吵架是不能解决任何问题的，我们要心平气和的给出自己的观点，看是否可以说服对方。
- 如果双方都不能被说服，我们可以找更权威的人来帮我们解决问题。
举个例子：我在做有个项目叫患者报到的时候，我当时还是一个刚入职的开发，我和团队内部的一个人在方案设计上产生了分歧。
我们两个就是谁也不能说服对方，我这边主动找到了当前我的组长，让他看我们两个人的方案谁的更合理。
在经过最后的讨论后，我们两个人的方案被融合到一起，形成了最终上线的版本。
其实我后来也想了，我当时也可以将两者的方案结合，但是因为当时比较年轻，也有点上头，所以有些固执己见了。
这个事情给我的一个反思就是：遇到问题解决问题，同事之间都是为了整个项目，也不是敌人，要求同存异，互相吸取优点。

## 你进行过哪些方案设计？

