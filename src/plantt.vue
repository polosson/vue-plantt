<template>
    <div class="Plantt">
        <table class="timeline__grid">
            <thead>
                <tr class="timeline__monthsLine">
                    <th
                        v-for="month in gridView.months"
                        :key="month.key"
                        :colspan="month.numberOfDays"
                        class="timeline__month"
                    >
                        {{month.name}}
                    </th>
                </tr>
                <tr class="timeline__daysLine">
                    <th
                        v-for="day in gridView.days"
                        :key="day.key"
                        :title="day.title"
                        :class="{
                            'today': day.today,
                            'sunday': day.date.getDay() === 0,
                            'lastOfMonth': day.isLastOfMonth
                        }"
                    >
                        <div class="timeline__labels" :style="{ height: gridView.height + 'px' }">
                            <div class="timeline__daysLabel-top">
                                <div v-show="gridView.dayCellsWidth >= minCellWidthForDays">
                                    {{day.num}}
                                </div>
                                <table
                                    class="timeline__hoursLine"
                                    v-show="useHours && gridView.dayCellsWidth >= minCellWidthForHours">
                                    <thead>
                                        <tr :height="gridView.height - 40">
                                        <th
                                            v-for="hour in gridView.hours"
                                            :key="hour.key"
                                            :title="`${day.title}, ${hour.title}:00`"
                                            :class="{ 'today': day.today }"
                                        >
                                            <span>{{hour.title}}</span>
                                        </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="timeline__daysLabel-bottom">
                                <div v-show="day.nbEvents > 0 && gridView.dayCellsWidth < 100">
                                    {{day.nbEvents}}
                                </div>
                                <div v-show="day.nbEvents > 0 && gridView.dayCellsWidth >= 100">
                                    ({{day.nbEvents}} items)
                                </div>
                                <div v-show="gridView.dayCellsWidth < minCellWidthForHours && gridView.dayCellsWidth > 50">
                                    {{day.labelShort}}
                                </div>
                                <div v-show="gridView.dayCellsWidth >= minCellWidthForHours">
                                    {{day.labelLong}}
                                </div>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
        </table>

        <div class="timeline__events-container">
            <div
                v-for="event in renderedEvents"
                :key="event.id"
                :id="event.id"
                :title="event.title"
                :style="event.locScale" class="timeline__event"
                :class="[event.extraClasses]"
            >
                <div
                    v-if="!event.locked"
                    class="timeline__event-handle timeline__event-handle--left"
                    :event-id="event.id"
                    handle-side="left"
                >
                </div>
                <div
                    v-if="!event.locked"
                    class="timeline__event-handle timeline__event-handle--right"
                    :event-id="event.id"
                    handle-side="right"
                >
                </div>
                <label
                    class="timeline__event-label"
                    :class="{
                        'timeline__event-label--hidden': event.hideLabel,
                        'timeline__event-label--movable': !event.locked,
                    }"
                >
                    {{event.name}}
                </label>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./plantt.ts"></script>
