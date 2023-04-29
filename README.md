# Линейный рекуррентный регистр

Моделирование работы линейного рекуррентного регистра длины 5 и исследование характеристик рекуррентной последовательности

## Необходимое ПО:

- Git - [Скачать и установить Git](https://git-scm.com/downloads).
- Node.js - [Скачать и установить Node.js](https://nodejs.org/en/download/)

## Как запустить программу:

1. Склонировать репозиторий:
```
git clone https://github.com/dumbus/linear-recurrent-register.git
```

2. Переместиться в скачанный репозиторий:
```
cd linear-recurrent-register
```

3. Запустить программу:
```
npm run start
```

## Как пользоваться программой:

1. Ввести степени характеристического многочлена `h(x)`

2. Ввести начальное положение регистра в десятичной системе счисления

3. Получить результаты моделирования

> Требования к предоставляемым данным описаны ниже.

## Требования к предоставляемым данным:

* Cтепени коэффициентов характеристического многочлена `h(x)` должны идти по убыванию и не должны повторяться, степени "5" и "0" являются обязательными

* Начальное положение регистра в десятичной системе счисления должны быть числом от 1 до 31

> Если в данных допущена ошибка, программа выведет в консоль соответствующее сообщение об ошибке.

*Пример возможных ошибок:*  


*Пример верно предоставленных данных:*  


## Результаты работы программы:

### 1. Параметры регистра:

* Формула характеристического многочлена `h(x)`

* Двоичное представление регистра

* Начальное заполнение регистра

* Нелинейные узлы, используемые для построения формирователя случайной гаммы

* Максимально возможный период регистра

* Максимально возможная длина рекуррентной последовательности

*Скриншот с примером вывода:*  


### 2. Моделирование работы линейного рекуррентного регистра

* Таблица смены состояний регистра
* Линейно рекуррентная последовательность, построенная на основе найденного периода
* Длина найденного периода

> Если длина найденного периода не равна максимально возможной, находится ранее не использованное положение регистра и используется в качестве начального для нового периода. Таким образом, поиск периодов регистра продолжится до тех пор, пока не будут найдены все периоды (сумма длин всех периодов регистра должна быть равна максимально возможной длине периода заданной длины).

*Скриншот с примером вывода первого найденного периода регистра:*  


*Скриншот с примером вывода найденных далее периодов регистра:*  


### 3. Исследование линейно рекуррентной последовательности (для периода максимальной длины)

* Линейно рекуррентная последовательность
* Период последовательности
* Баланс единиц и нулей
* Серии одинаковых символов, идущих подряд
* Свойство "окна" (сначала описаны все состояния регистра, затем делается вывод о выполнении или невыполнении свойства "окна")

*Скриншот с примером вывода:*   

### Принцип работы линейного рекуррентного регистра

Линейный рекуррентный регистр (ЛРР) – это схема или алгоритм получения последовательности битов, генерируемая с помощью рекуррентного уравнения.

Схема ЛРР длины 5:  


Принцип работы данной схемы:

* Первоначально в ячейки памяти вводится двоичное начальное заполнение, затем под воздействием каждого из тактовых импульсов содержимое этих ячеек памяти сдвигается на одну ячейку вправо;
* Одновременно с выходов ячеек их содержимое (0 или 1) поступает на вход сумматора по mod 2 через «коммутатор обратных связей»;
* Содержимое крайней правой ячейки одновременно поступает на выход схемы и на вход сумматора, а выход сумматора соединен со входом первой ячейки памяти.
* Таким образом, при ненулевом начальном заполнении на выходе схемы ЛРР будет появляться неограниченная по длине ненулевая двоичная последовательность, если число тактовых импульсов также не ограничено.

Линейная рекуррентная последовательность строится на основе результатов суммы каждого такта работы регистра.
