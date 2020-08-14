please-enter-your-name = Введите имя

create-new-game = Создать новую игру
options = Опции
create = Создать
available-factions = Доступные фракции
faction-assignment = Выбор фракций
random = Случайный
choose = Выбор игроками

join-existing-game = Присоединиться к игре
join = Присоединиться
game-name = Название игры

back = Назад
done = Готово
leave = Выйти
enter = Войти
cancel = Отменить
ready = Готов
select = Выбрать
empty = Пусто
loading = Загрузка...
connecting = Соединение...

players = Игроки

map = Карта
forest = Осень
winter = Зима

suit-fox = Лисы
suit-rabbit = Зайцы
suit-mouse = Мыши
suit-bird = Птицы

factions = Фракции
marquise = { $form ->
  [long] Маркиса де Коте
  *[short] Маркиса
}
eyrie = { $form ->
  [long] Крылатая династия
  *[short] Династия
}
alliance = { $form ->
  [long] Лесной альянс
  *[short] Альянс
}
vagabond = { $form ->
  [long] Бродяга
  *[short] Бродяга
}
vagabond2 = { $form ->
  [long] Второй бродяга
  *[short] Бродяга 2
}
cult = { $form ->
  [long] Культ пресмыкающихся
  *[short] Культ
}
riverfolk = { $form ->
  [long] Речное братство
  *[short] Братство
}
marquise_bot = { $form ->
  [long] Механическая Маркиса
  *[short] Механическая Маркиса
}

marquise-keep = { $quantity ->
  *[other] Цитадели
  [one] Цитадель
}
marquise-wood = { $quantity ->
  *[other] Дерево
  [one] Дерево
}
marquise-warrior = { $quantity ->
  *[other] Воины
  [one] Воин
}
marquise-workshop = { $quantity ->
  *[other] Мастерские
  [one] Мастерская
}
marquise-sawmill = { $quantity ->
  *[other] Лесопилки
  [one] Лесопилка
}
marquise-recruiter = { $quantity ->
  *[other] Казармы
  [one] Казарма
}

eyrie-leader-despot = Тиран
eyrie-leader-charismatic = Избранник
eyrie-leader-commander = Командир
eyrie-leader-builder = Строитель

vagabond-character-arbiter = Судья
vagabond-character-ranger = Следопыт
vagabond-character-scoundrel = Поджигатель
vagabond-character-thief = Вор
vagabond-character-tinker = Ремесленник
vagabond-character-vagrant = Скиталец

card-ambush = Засада
card-birdy_bindle = Птичкин узелок
card-armorers = Оружейники
card-woodland_runners = Лесная контрабанда
card-arms_trader = Торговец оружием
card-crossbow = Арбалет
card-sappers = Сапёры
card-brutal_tactics = Зверская тактика
card-royal_claim = Царские владения
card-gently_used_knapsack = Аккуратно ношенная котомка
card-root_tea = Чай из кореньев
card-travel_gear = Походное снаряжение
card-protection_racket = Вымогательство
card-foxfolk_steel = Лисья сталь
card-anvil = Наковальня
card-stand_and_deliver = Кошелек или жизнь
card-tax_collector = Сборщик налогов
card-favor_of_the_foxes = Лисья услуга
card-smugglers_trail = Тропа контрабандистов
card-a_visit_to_friends = Дружеский визит
card-bake_sale = Распродажа выпечки
card-command_warren = Командная нора
card-better_burrow_bank = Банк зарытых вкладов
card-cobbler = Сапожник
card-favor_of_the_rabbits = Заячья услуга
card-mouse_in_a_sack = Мышь в мешке
card-investments = Инвестиции
card-sword = Меч
card-scouting_party = Разведчики
card-codebreakers = Дешифровщики
card-favor_of_the_mice = Мышиная услуга
card-dominance = Доминирование
card-spy = Шпион

item-tea = {
  *[other] Чайники
  [one] Чайник
}
item-bag = {
  *[other] Сумки
  [one] Сумка
}
item-coin = {
  *[other] Монеты
  [one] Монета
}
item-sword = {
  *[other] Мечи
  [one] Меч
}
item-crossbow = {
  *[other] Арбалеты
  [one] Арбалет
}
item-torch = {
  *[other] Факелы
  [one] Факел
}
item-boot = {
  *[other] Сапоги
  [one] Сапоги
}
item-hammer = {
  *[other] Молоты
  [one] Молот
}

prompt-place-keep = Поместите цитадель в угловую поляну
prompt-place-building = Разместите { REF($building, quantity: 1) } рядом с цитаделью
prompt-choose-leader = Выберите лидера
prompt-choose-starting-clearing = Выберите угловую поляну для старта
prompt-choose-character = Выберите персонажа
prompt-choose-forest = Выберите стартовый лес
prompt-choose-rivers = Расположите воинов по реке
prompt-set-prices = Установите цены на услуги
prompt-choose-first-outcast = Выберите первого изгоя
prompt-choose-sawmill = Выберите лесопилку для производства

rejection-game-already-exists = Игра { $name } уже существует.
rejection-game-does-not-exist = Игры { $name } не существует.
rejection-game-is-full = В игре { $name } нет свободных мест.
rejection-player-already-joined = В игре { $gameName } уже есть игрок с именем { $playerName }.
rejection-game-already-started = Игра { $gameName } уже началась.
rejection-invalid-player = В игре { $gameName } нет игрока с именем { $playerName }.
rejection-illegal-faction = Фракции { REF($faction, form: "long") } нет в игре.
rejection-faction-taken = Фракция { REF($faction, form: "long") } уже занята игроком { $playerName }.
rejection-invalid-clearing-for-keep = Цитадель должна находиться в угловой поляне.
rejection-invalid-clearing-for-starting-building = Стартовые здания должно быть на поляне с цитделью или на соседних полянах
rejection-no-more-slots = В этой поляне нет места для строительства.
rejection-no-more-pieces = У вас больше нет { REF($piece, quantity: 0) }.
rejection-leader-unavailable = { REF($leader) } сейчас недоступен.
rejection-duplicate-roost = На этой поляне уже есть гнездо.
rejection-character-already-taken = { REF($character) } уже занят.
rejection-not-a-river = Поляна должна находиться у реки.
rejection-invalid-start-clearing = Вы должны начать в угловой поляне.
rejection-no-sawmill = В этой поляне нет лесопилок.
rejection-invalid-card-suit = Вам надо выбрать { REF($suit) } карту.
rejection-cannot-afford-crafting = Вы не можете скрафтить { REF($card) }.
rejection-not-enough-items = Больше нет { REF($item, quantity: 0) } для крафта.
rejection-duplicate-permanent-effect = Вы уже скрафтили { REF($item, quantity: 1) }.
rejection-no-targets-for-battle = В этой поляне не с кем сражаться.
rejection-no-pieces-of-faction = В этой поляне нет компонентов { REF($faction) }.
